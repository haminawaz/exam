const Stripe = require("stripe");
const User = require("../../models/user.js");
const Level = require("../../models/level.js");
const Order = require("../../models/order.js");
const Test = require("../../models/test.js");
const { configurations } = require("../../config/config.js");
const { sendMail } = require("../../utils/sendMail.js");

const stripe = Stripe(configurations.stripeSecretKey);

const createCheckout = async (req, res) => {
  const { firstName, lastName, email, postalCode } = req.body;
  const { levelId } = req.params;

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        postalCode,
        code,
      });
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.code = code;
      user.postalCode = postalCode;
      await user.save();
    }

    const orders = await Order.find({
      userId: user?._id,
    }).populate("levelId");

    const currentDate = new Date();

    const hasPurchased = orders.some((order) => {
      const expiryDate = new Date(order.expiryDate);
      return (
        order.levelId._id.toString() === levelId && expiryDate > currentDate
      );
    });
    if (hasPurchased) {
      return res.status(400).json({
        message: "Vous avez déjà acheté ce niveau",
        response: null,
        error: "Vous avez déjà acheté ce niveau",
      });
    }

    const level = await Level.findById(levelId);
    if (!level) {
      return res.status(404).json({
        message: "Niveau introuvable",
        response: null,
        error: "Niveau introuvable",
      });
    }
    const orderLevel = level.level;

    if (orderLevel > 1) {
      const alreadyHasHigherLevel = orders.some(
        (order) => order.levelId.level > orderLevel
      );
      if (alreadyHasHigherLevel) {
        return res.status(400).json({
          message: `Vous avez déjà acheté un niveau supérieur, donc vous n'achetez pas le niveau ${orderLevel}`,
          response: null,
          error: `Vous avez déjà acheté un niveau supérieur, donc vous n'achetez pas le niveau ${orderLevel}`,
        });
      }

      const hasPreviousLevel = orders.some(
        (order) => order.levelId.level === orderLevel - 1
      );
      if (!hasPreviousLevel) {
        return res.status(400).json({
          message: `Vous ne pouvez pas acheter le niveau ${orderLevel} sans acheter le niveau ${
            orderLevel - 1
          } au préalable`,
          response: null,
          error: `Vous ne pouvez pas acheter le niveau ${orderLevel} sans acheter le niveau ${
            orderLevel - 1
          } au préalable`,
        });
      }

      const passedTest = await Test.aggregate([
        {
          $match: {
            user: user._id,
            percentage: { $gte: 70 },
          },
        },
        {
          $lookup: {
            from: "levels",
            localField: "levelId",
            foreignField: "_id",
            as: "levelInfo",
          },
        },
        {
          $unwind: "$levelInfo",
        },
        {
          $match: {
            "levelInfo.level": orderLevel - 1,
          },
        },
      ]);
      if (!passedTest || passedTest.length < 1) {
        return res.status(400).json({
          message: `Vous ne pouvez pas acheter le niveau ${orderLevel} sans réussir le test avec 70 % pour le niveau ${
            orderLevel - 1
          }`,
          response: null,
          error: `Vous ne pouvez pas acheter le niveau ${orderLevel} sans réussir le test avec 70 % pour le niveau ${
            orderLevel - 1
          }`,
        });
      }
    }

    const price = level.price;
    const name = `Level ${level.level}`;

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      metadata: {
        userId: user._id.toString(),
        levelId: level._id.toString(),
      },
      success_url: `${configurations.frontendBaseUrl}/payment?selected-level=4`,
      cancel_url: `${configurations.frontendBaseUrl}/payment`,
    });

    const data = {
      data: {
        sessionId: session.id,
      },
    };

    return res.status(201).json({
      message: "La session de paiement a été créée avec succès",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

const checkoutComplete = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const body = req.body;

  if (!sig) {
    return res.status(400).json({
      message: "Aucune valeur d'en-tête de signature par bande n'a été fournie",
      response: null,
      error: "Aucune valeur d'en-tête de signature par bande n'a été fournie",
    });
  }
  try {
    if (body.type === "checkout.session.completed") {
      const transactionId = body.data.object.id;
      const dateCreated = new Date(body.data.object.created * 1000);

      const existingTransaction = await Order.findOne({ transactionId });
      if (existingTransaction) {
        return res.status(409).json({
          message: "La transaction a déjà été traitée",
          response: null,
          error: "La transaction a déjà été traitée",
        });
      }

      const session = await stripe.checkout.sessions.retrieve(transactionId, {
        expand: ["line_items"],
      });

      const { userId, levelId } = session.metadata;
      const status = session.payment_status;
      const price = session.amount_total / 100;

      const existingOrder = await Order.findOne({ userId });

      let order = null;
      if (existingOrder) {
        existingOrder.levelId = levelId;
        existingOrder.price = price;
        existingOrder.paymentStatus =
          status === "paid" ? "completed" : "failed";
        existingOrder.paymentDate = status === "paid" ? dateCreated : null;
        existingOrder.transactionId = transactionId;
        await existingOrder.save();

        order = existingOrder;
      } else {
        const newOrder = new Order({
          userId,
          levelId,
          price,
          transactionId,
          paymentStatus: status === "paid" ? "completed" : "failed",
          paymentDate: status === "paid" ? dateCreated : null,
        });
        await newOrder.save();
        order = newOrder;
      }

      const buyer = await User.findById(userId);
      const level = await Level.findById(levelId);

      const paymentDate = order.paymentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const expiryDate = order.expiryDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const orderCompleteTemplate = `
          <!DOCTYPE html>
          <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Order Confirmation</title>
              <style>
                body, table, td, div, p {
                  margin: 0;
                  padding: 0;
                  font-family: Arial, sans-serif;
                  color: #333333;
                }
                body {
                  background-color: #f3f4f6;
                }
                .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                  background-color: #10b981;
                  padding: 20px;
                  text-align: center;
                  color: #ffffff;
                }
                .email-header h1 {
                  margin: 0;
                  font-size: 24px;
                }
                .email-body {
                  padding: 20px 20px 30px 20px;
                }
                .section-title {
                  font-size: 18px;
                  font-weight: bold;
                  color: #1f2937;
                  margin-bottom: 8px;
                }
                .section-text {
                  font-size: 14px;
                  line-height: 1.6;
                  color: #4b5563;
                }
                .highlight {
                  color: #10b981;
                  font-weight: bold;
                }
                .box {
                  background-color: #d1fae5;
                  border-radius: 6px;
                  padding: 16px;
                  margin-top: 16px;
                  margin-bottom: 16px;
                }
                .box p {
                  margin-bottom: 8px;
                }
                .price-div {
                  display:flex;
                  justify-content:center;
                  align-items:center;
                  margin-top:8px;
                  text-align: center;
                }
                .price {
                  font-size: 18px;
                  font-weight: bold;
                  color: #000000;
                  margin-right: 10px;
                }
                .badge-paid {
                  display: inline-block;
                  padding: 3px 12px;
                  border-radius: 12px;
                  background-color: #10b981;
                  color: #ffffff;
                  font-size: 12px;
                  font-weight: 600;
                }
                .divider {
                  border-bottom: 1px solid #e5e7eb;
                  margin: 16px 0;
                }
                .summary-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                }
                .summary-row .bold {
                  font-weight: bold;
                }
                .secret-code {
                  font-size: 16px;
                  font-weight: bold;
                  color: #dc2626;
                  margin-top: 8px;
                }
                .email-footer {
                  text-align: center;
                  padding: 16px;
                  font-size: 12px;
                  color: #6b7280;
                }
                .email-footer a {
                  color: #6b7280;
                  text-decoration: underline;
                }
                .social-icons i {
                  margin: 0 6px;
                  color: #6b7280;
                  cursor: pointer;
                  font-size: 16px;
                }
                .social-icons i:hover {
                  color: #10b981;
                }
              </style>
            </head>
            <body>
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="padding: 20px 0"
              >
                <tr>
                  <td align="center" valign="top">
                    <div class="email-container">
                      <div class="email-header">
                        <h1>Order Confirmation</h1>
                      </div>
                      <div class="email-body">
                        <p class="section-text">
                          Merci pour votre commande, 
                          <span class="highlight">
                            <strong>
                              ${
                                buyer?.firstName.charAt(0).toUpperCase() +
                                buyer.firstName.slice(1)
                              }
                              ${
                                buyer?.lastName.charAt(0).toUpperCase() +
                                buyer.lastName.slice(1)
                              }
                            </strong>
                          </span>!
                        </p>                            
                        <p class="section-text">
                          Votre paiement a bien été traité ! Vous pouvez désormais commencer la préparation de l’examen grâce à nos fonctionnalités premium.
                        </p>
                        <div>
                           <p style="text-align: center; margin-bottom: 0px;">Pour utiliser votre code, suivez les étapes ci-dessous :</p>
                          <ol style="margin-top: 0px;">
                            <li>
                              Rendez-vous sur le site web
                              <a href="https://www.acces-sec.ca" target="_blank"
                                >www.acces-sec.ca</a
                              >
                            </li>
                            <li>Cliquez sur l’onglet « Commencer ma préparation »</li>
                            <li>Utilisez votre courriel d’identification et le code fourni</li>
                            <li>Commencez l’examen</li>
                          </ol>
                        </div>
                        <div class="box" style="text-align:center;">
                          <p class="section-text" style="margin-bottom: 12px;">
                            <strong>Votre code d'accès premium:</strong>
                          </p>
                          <p class="secret-code">
                            ${buyer?.code}
                          </p>
                          <p class="section-text" style="margin-top: 12px;">
                            <em>Veuillez garder ce code secret. Il vous donne accès aux questions premium.</em>
                          </p>
                        </div>
                        <div class="box">
                          <h2 class="section-title" style="margin-top:0;">Détails de l'abonnement</h2>
                          <p class="section-text" style="margin: 0;">
                            Abonnement Premium - Niveau ${level.level}
                          </p>
                          <p class="section-text" style="margin: 0;">
                            Durée de l'abonnement - 2 mois
                          </p>
                          <div class="price-div">
                            <span class="price">
                              $${order.price} CA
                            </span>
                            <span class="badge-paid">Payé</span>
                          </div>
                        </div>
                        <div class="box">
                          <h2 class="section-title" style="margin-top:0;">Résumé de l’accès</h2>
                          <div class="summary-row">
                            <span class="bold">Identification de la commande:</span>
                            <span>${order._id.toString()}</span>
                          </div>
                          <div class="summary-row">
                            <span class="bold">Date de paiement :</span>
                            <span>${paymentDate}</span>
                          </div>
                          <div class="summary-row">
                            <span class="bold">Date d'expiration :</span>
                            <span>${expiryDate}</span>
                          </div>
                        </div>
                      </div>
                      <div class="email-footer">
                        Besoin d'aide ? Contactez notre équipe d'assistance <br />
                        <a href="mailto:info@access-sec.ca">info@access-sec.ca</a><br /><br />
                        © 2025 Acces-Sec. Tous droits réservés.
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </body>
          </html>
      `;
      const dynamicData = {
        subject: "Payment Successfully",
        to_email: buyer.email,
      };
      await sendMail(orderCompleteTemplate, dynamicData);

      return res.status(201).json({
        message: "La commande a été passée avec succès",
        response: null,
        error: null,
      });
    }

    return res.status(400).json({
      message: "No body type has been matched",
      response: null,
      error: "No body type has been matched",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  createCheckout,
  checkoutComplete,
};
