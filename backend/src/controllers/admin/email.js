const Email = require("../../models/email");

const getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find().sort("-createdAt");
    if (!emails || emails?.lenght < 1) {
      return res.status(404).json({
        message: "No emails found",
        response: null,
        error: "No emails found",
      });
    }

    const data = {
      data: emails,
    };

    return res.status(200).json({
      message: "All emails retrieved successfully",
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

const updateEmail = async (req, res) => {
  const emailId = req.params.emailId;
  const { header, footer } = req.body;
  try {
    const existingEmail = await Email.findById(emailId);
    if (!existingEmail) {
      return res.status(404).json({
        message: "Email not found",
        response: null,
        error: "Email not found",
      });
    }

    const duplicateEmail = await Email.findOne({
      name: existingEmail.name,
      _id: { $ne: emailId },
    });
    if (duplicateEmail) {
      return res.status(400).json({
        message: "Duplicate email are not allowed",
        response: null,
        error: "Duplicate email are not allowed",
      });
    }

    existingEmail.header = header || existingEmail.header;
    existingEmail.footer = footer || existingEmail.footer;
    await existingEmail.save();

    return res.status(200).json({
      message: "Email updated successfully",
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
  getAllEmails,
  updateEmail,
};
