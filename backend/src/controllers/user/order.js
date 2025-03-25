const Stripe = require("stripe");
const User = require("../../models/user.js");
const Level = require("../../models/level.js");
const Order = require("../../models/order.js");
const Test = require("../../models/test.js");
const { configurations } = require("../../config/config.js");
const { sendMail } = require("../../utils/sendMail.js");

const stripe = Stripe(configurations.stripeSecretKey);

const createCheckout = async (req, res) => {
  const user = req.decoded;
  const { levelId } = req.params;

  try {
    const orders = await Order.find({
      userId: user._id,
      paymentStatus: "completed",
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
        message: "You already have purchased this level",
        response: null,
        error: "You already have purchased this level",
      });
    }

    const level = await Level.findById(levelId);
    if (!level) {
      return res.status(404).json({
        message: "Level not found",
        response: null,
        error: "Level not found",
      });
    }
    const orderLevel = level.level;

    if (orderLevel > 1) {
      const hasPreviousLevel = orders.some(
        (order) => order.levelId.level === orderLevel - 1
      );
      if (!hasPreviousLevel) {
        return res.status(400).json({
          message: `You cannot buy level ${orderLevel} without purchasing level ${
            orderLevel - 1
          } first`,
          response: null,
          error: `You cannot buy level ${orderLevel} without purchasing level ${
            orderLevel - 1
          } first`,
        });
      }

      const passedTest = await Test.findOne({
        user: user._id,
        "levelId.level": orderLevel - 1,
        score: { $gte: 75 },
      });
      if (!passedTest) {
        return res.status(400).json({
          message: `You cannot buy level ${orderLevel} without passing the test with 70% for level ${
            orderLevel - 1
          }`,
          response: null,
          error: `You cannot buy level ${orderLevel} without passing the test with 70% for level ${
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
      success_url: `${configurations.frontendBaseUrl}/payment?selected-level=5`,
      cancel_url: `${configurations.frontendBaseUrl}/payment`,
    });

    const data = {
      data: {
        sessionId: session.id,
      },
    };

    return res.status(201).json({
      message: "Checkout session created successfully",
      response: data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
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
      message: "No stripe-signature header value was provided",
      response: null,
      error: "No stripe-signature header value was provided",
    });
  }
  try {
    if (body.type === "checkout.session.completed") {
      const transactionId = body.data.object.id;
      const dateCreated = new Date(body.data.object.created * 1000);

      const existingTransaction = await Order.findOne({ transactionId });
      if (existingTransaction) {
        return res.status(409).json({
          message: "Transaction already processed",
          response: null,
          error: "Transaction already processed",
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
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Payment Confirmation</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f9fafb;
                  margin: 0;
                  padding: 0;
                }

                .container {
                  min-height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 3rem 1rem;
                }

                .card {
                  width: 100%;
                  max-width: 600px;
                  background-color: #ffffff;
                  padding: 2rem;
                  border-radius: 12px;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .card h1 {
                  font-family: 'Pacifico', sans-serif;
                  font-size: 2rem;
                  color: #4b5563;
                  margin-bottom: 1.5rem;
                }

                .check-icon {
                  width: 4rem;
                  height: 4rem;
                  margin: 1rem auto;
                  background-color: #d1fae5;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 1rem;
                }

                .check-icon i {
                  font-size: 2rem;
                  color: #10b981;
                }

                .section-title {
                  font-size: 1.5rem;
                  font-weight: bold;
                  color: #1f2937;
                  margin-bottom: 1rem;
                }

                .section-text {
                  color: #4b5563;
                }

                .plan-card, .summary-card {
                  background-color: #d1fae5;
                  padding: 1.5rem;
                  border-radius: 12px;
                  margin-bottom: 1.5rem;
                }

                .plan-card p {
                  color: #4b5563;
                }

                .plan-price {
                  color: #4b5563;
                  font-weight: bold;
                  font-size: 1.25rem;
                }

                .status-tag {
                  display: inline-block;
                  padding: 0.25rem 0.75rem;
                  background-color: #10b981;
                  color: #d1fae5;
                  font-size: 0.875rem;
                  border-radius: 12px;
                  font-weight: 500;
                }

                .summary-list {
                  margin-top: 1rem;
                  gap: 1rem;
                }

                .summary-list div {
                  display: flex;
                  justify-content: space-between;
                  font-size: 0.875rem;
                  color: #4b5563;
                }

                .footer {
                  text-align: center;
                  margin-top: 2rem;
                }

                .footer p {
                  color: #6b7280;
                  font-size: 0.875rem;
                }

                .footer a {
                  color: #6b7280;
                  text-decoration: underline;
                }

                .footer .social-icons i {
                  margin-right: 1rem;
                  color: #6b7280;
                  font-size: 1.25rem;
                  cursor: pointer;
                }

                .social-icons i:hover {
                  color: #10b981;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="card">
                  <div class="text-center">
                    <h2 class="section-title">Order Confirmation</h2>
                    <p class="section-text">Thank you for your order, ${
                      buyer?.name
                        ? buyer.name.charAt(0).toUpperCase() +
                          buyer.name.slice(1)
                        : ""
                    }!</p>
                  </div>

                  <div class="plan-card text-center">
                    <p class="section-text">Your payment has been successfully processed!</p>
                    <p class="section-text">You can now start your preparations using our premium features.</p>
                  </div>

                  <div class="plan-card">
                    <h3 class="section-title">Plan Details</h3>
                    <div class="flex justify-between">
                      <div>
                        <p>Premium Plan - Level ${level.level}</p>
                        <p class="text-sm text-gray-500">2 Month Subscription</p>
                      </div>
                      <div class="text-right">
                        <p class="plan-price">${order.price}</p>
                        <span class="status-tag">Paid</span>
                      </div>
                    </div>
                  </div>

                  <div class="summary-card">
                    <h3 class="section-title">Order Summary</h3>
                    <div class="summary-list">
                      <div>
                        <span>Order ID:</span>
                        <span>${order._id.toString()}</span>
                      </div>
                      <div>
                        <span>Payment Date:</span>
                        <span>${paymentDate}</span>
                      </div>
                      <div>
                        <span>Expiry Date:</span>
                        <span>${expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    <p>Need help? Contact our support team</p>
                    <p class="text-sm">support@logo.com | +1 (555) 123-4567</p>

                    <div class="social-icons">
                      <i class="ri-twitter-line"></i>
                      <i class="ri-facebook-line"></i>
                      <i class="ri-instagram-line"></i>
                    </div>

                    <div class="text-xs">
                      <p>© 2025 Logo. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>

      `;
      const dynamicData = {
        subject: "Payment Successfully",
        to_email: buyer.email,
      };
      await sendMail(orderCompleteTemplate, dynamicData);

      return res.status(201).json({
        message: "Order has been placed successfully",
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
      message: "Internal Server Error",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  createCheckout,
  checkoutComplete,
};
