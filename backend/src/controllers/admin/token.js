const User = require("../../models/user");
const Test = require("../../models/test");
const Level = require("../../models/level");
const Order = require("../../models/order");
const { sendMail } = require("../../utils/sendMail");

const createToken = async (req, res) => {
  const userId = req.params.userId;
  const levelId = req.query.levelId;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    let existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
        response: null,
        error: "Utilisateur introuvable",
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

    const order = await Order.findOne({
      userId: userId,
    }).populate("levelId");
    const currentDate = new Date();
    let expiryDate;

    if (order) {
      expiryDate = new Date(order.expiryDate);
      const orderValid =
        order.levelId._id.toString() === levelId && expiryDate > currentDate;
      if (orderValid) {
        return res.status(400).json({
          message: "L'utilisateur a déjà acheté ce niveau",
          response: null,
          error: "L'utilisateur a déjà acheté ce niveau",
        });
      }

      const alreadyHasHigherLevel = order.levelId.level > orderLevel;
      if (alreadyHasHigherLevel) {
        return res.status(400).json({
          message: `L'utilisateur a déjà le niveau ${order.levelId.level},ne peut pas attribuer un niveau inférieur au niveau ${order.levelId.level}`,
          response: null,
          error: `L'utilisateur a déjà le niveau ${order.levelId.level},ne peut pas attribuer un niveau inférieur au niveau ${order.levelId.level}`,
        });
      }

      const hasPreviousLevel = order.levelId.level === orderLevel - 1;
      if (!hasPreviousLevel) {
        return res.status(400).json({
          message: `L'utilisateur ne peut pas avoir le niveau  ${orderLevel} sans réussir le test avec 70 % pour le niveau  ${
            orderLevel - 1
          }`,
          response: null,
          error: `L'utilisateur ne peut pas avoir le niveau  ${orderLevel} sans réussir le test avec 70 % pour le niveau  ${
            orderLevel - 1
          }`,
        });
      }

      const passedTest = await Test.find({
        user: userId,
        "levelId.level": orderLevel - 1,
        percentage: { $gte: 70 },
      });
      if (!passedTest || passedTest.length < 1) {
        return res.status(400).json({
          message: `L'utilisateur ne peut pas avoir le niveau  ${orderLevel} sans réussir le test avec 70 % pour le niveau  ${
            orderLevel - 1
          }`,
          response: null,
          error: `L'utilisateur ne peut pas avoir le niveau  ${orderLevel} sans réussir le test avec 70 % pour le niveau  ${
            orderLevel - 1
          }`,
        });
      }

      order.levelId = level._id;
      order.paymentDate = currentDate;
      order.paymentStatus = "gifted";
      order.transactionId = null;
      order.price = null;
      await order.save();
    } else {
      const alreadyHasHigherLevel = orderLevel !== 1;
      if (alreadyHasHigherLevel) {
        return res.status(400).json({
          message:
            "L'utilisateur n'a pas encore acheté de niveaux,donc le niveau de départ sera le niveau 1",
          response: null,
          error: `L'utilisateur n'a pas encore acheté de niveaux,donc le niveau de départ sera le niveau 1`,
        });
      }

      const newOrder = new Order({
        userId,
        levelId,
        paymentStatus: "gifted",
        paymentDate: currentDate,
      });
      await newOrder.save();
      expiryDate = newOrder?.expiryDate;
    }
    existingUser.code = code;
    await existingUser.save();

    const buyer = await User.findById(userId);
    const paymentDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const emailExpiryDate = expiryDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const orderCompleteTemplate = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta charset="UTF-8" />
          <style>
            body {
              margin: 0;
              font-family: Arial, sans-serif;
              background-color: #f3f4f6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 6px;
              overflow: hidden;
              box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #10b981;
              color: #ffffff;
              text-align: center;
              padding: 16px;
              font-size: 20px;
              font-weight: bold;
            }
            .content {
              padding: 20px;
            }
            .content p {
              line-height: 1.5;
              margin: 12px 0;
            }
            .highlight {
              color: #10b981;
              font-weight: bold;
            }
            .steps {
              background-color: #e0f7f0;
              padding: 12px;
              border-radius: 4px;
              margin-top: 16px;
            }
            .steps ol {
              padding-left: 20px;
            }
            .code-box {
              background-color: #d1fae5;
              padding: 14px;
              text-align: center;
              margin: 20px 0;
              border-radius: 6px;
            }
            .code {
              font-size: 20px;
              font-weight: bold;
              color: #dc2626;
            }
            .section {
              background-color: #ccfbf1;
              padding: 16px;
              margin: 16px 0;
              border-radius: 6px;
            }
            .price-tag {
              color: #6366f1;
              font-weight: bold;
              margin-top: 8px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
              padding: 16px;
            }
            .footer a {
              color: #10b981;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Accès Premium offert</div>
            <div class="content">
              <p style="text-align: center;">
                Bonjour
                <span class="highlight">
                  <strong>
                    ${ buyer?.firstName.charAt(0).toUpperCase() +
                    buyer.firstName.slice(1) } ${
                    buyer?.lastName.charAt(0).toUpperCase() + buyer.lastName.slice(1)
                    }
                  </strong>
                </span>
                !
              </p>
              <p>
                L’administrateur vous a attribué un <strong>accès premium</strong> !
                Vous pouvez désormais commencer à vous préparer grâce à nos
                fonctionnalités premium.
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
                  
              <div class="code-box">
                <div><strong>Votre code d'accès premium</strong></div>
                <div class="code">${buyer?.code}</div>
                <p>
                  Veuillez garder ce code secret. Il vous donne accès aux questions
                  premium.
                </p>
              </div>
                  
              <div class="code-box">
                <strong>Détails de l'abonnement</strong><br />
                Abonnement Premium - Niveau ${orderLevel}<br />
                Durée de l'abonnement : 2 mois<br />
                <div class="price-tag">Offert</div>
              </div>
                  
              <div class="code-box">
                <strong>Résumé de l’accès</strong><br />
                Offert le : ${paymentDate}<br />
                Date d'expiration : ${emailExpiryDate}
              </div>
            </div>
                  
            <div class="footer">
              Besoin d'aide ? Contactez notre équipe d'assistance <br />
              <a href="mailto:info@access-sec.ca">info@access-sec.ca</a><br /><br />
              © 2025 Acces-Sec. Tous droits réservés.
            </div>
          </div>
        </body>
      </html>
    `;
    const dynamicData = {
      subject: "Gifted Access",
      to_email: buyer.email,
    };
    await sendMail(orderCompleteTemplate, dynamicData);

    return res.status(201).json({
      message: "Jeton créé avec succès pour l'utilisateur",
      response: null,
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

module.exports = {
  createToken,
};
