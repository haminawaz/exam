const Stripe = require("stripe");
const User = require("../../models/user.js");
const Level = require("../../models/level.js");
const Order = require("../../models/order.js");
const Test = require("../../models/test.js");
const { configurations } = require("../../config/config.js");
const { configs } = require("../../config/email-config.js");
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
      const dynamicData = {
        buyerName: buyer.name,
        price: order.price,
        paymentDate,
        orderId: order._id.toString(),
        levelNumber: level.level,
        expiryDate,
        to_email: buyer.email,
      };
      await sendMail(configs.templates.accesSecOrder, dynamicData);

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
