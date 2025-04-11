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
        message: "User not found",
        response: null,
        error: "User not found",
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
          message: "User has already purchased this level",
          response: null,
          error: "User has already purchased this level",
        });
      }

      const alreadyHasHigherLevel = order.levelId.level > orderLevel;
      if (alreadyHasHigherLevel) {
        return res.status(400).json({
          message: `User already has level ${order.levelId.level}, cannot assign lower than level ${order.levelId.level}`,
          response: null,
          error: `User already has level ${order.levelId.level}, cannot assign lower than level ${order.levelId.level}`,
        });
      }

      const hasPreviousLevel = order.levelId.level === orderLevel - 1;
      if (!hasPreviousLevel) {
        return res.status(400).json({
          message: `User cannot have level ${orderLevel} without passing the test with 70% for level ${
            orderLevel - 1
          }`,
          response: null,
          error: `User cannot have level ${orderLevel} without passing the test with 70% for level ${
            orderLevel - 1
          }`,
        });
      }

      const passedTest = await Test.find({
        user: userId,
        "levelId.level": orderLevel - 1,
        percentage: { $gte: 70 },
      });
      if (!passedTest) {
        return res.status(400).json({
          message: `User cannot have level ${orderLevel} without passing the test with 70% for level ${
            orderLevel - 1
          }`,
          response: null,
          error: `User cannot have level ${orderLevel} without passing the test with 70% for level ${
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
            "The user has not purchased any levels yet, so the starting level will be Level 1",
          response: null,
          error: `The user has not purchased any levels yet, so the starting level will be Level 1`,
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
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Gifted Access</title>
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
                    <h1>Premium Access Gifted</h1>
                  </div>
                  <div class="email-body">
                    <p class="section-text">
                      Hello
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
                      You have been <strong>gifted premium access</strong> by admin!
                      You can now start your preparations using our premium features.
                    </p>
                    <div class="box" style="text-align:center;">
                      <p class="section-text" style="margin-bottom: 12px;">
                        <strong>Your Premium Access Code:</strong>
                      </p>
                      <p class="secret-code">
                        ${buyer?.code}
                      </p>
                      <p class="section-text" style="margin-top: 12px;">
                        <em>Please keep this code secret. It allows access to premium questions.</em>
                      </p>
                    </div>
                    <div class="box">
                      <h2 class="section-title" style="margin-top:0;">Plan Details</h2>
                      <p class="section-text" style="margin: 0;">
                        Premium Plan - Level ${orderLevel}
                      </p>
                      <p class="section-text" style="margin: 0;">
                        Gifted Duration: 2 Months
                      </p>
                      <div class="price-div">
                        <span class="badge-paid" style="background-color: #6366f1;">Gifted</span>
                      </div>
                    </div>
                    <div class="box">
                      <h2 class="section-title" style="margin-top:0;">Access Summary</h2>
                      <div class="summary-row">
                        <span class="bold">Gifted On:</span>
                        <span>${paymentDate}</span>
                      </div>
                      <div class="summary-row">
                        <span class="bold">Expiry Date:</span>
                        <span>${emailExpiryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div class="email-footer">
                    <p>Need help? Contact our support team</p>
                    <p>support@logo.com | +1 (555) 123-4567</p>
                    <div class="social-icons">
                      <i class="ri-twitter-line"></i>
                      <i class="ri-facebook-line"></i>
                      <i class="ri-instagram-line"></i>
                    </div>
                    <p style="margin-top: 8px;">
                      © 2025 Logo. All rights reserved.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
    const dynamicData = {
      subject: "Gifted Access",
      to_email: buyer.email,
    };
    await sendMail(orderCompleteTemplate, dynamicData);

    return res.status(201).json({
      message: "Token created successfully for the user",
      response: null,
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

module.exports = {
  createToken,
};
