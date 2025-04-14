const Email = require("../../models/email");

const getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find().sort("-createdAt");
    if (!emails || emails?.lenght < 1) {
      return res.status(404).json({
        message: "Aucun e-mail n'a été trouvé",
        response: null,
        error: "Aucun e-mail n'a été trouvé",
      });
    }

    const data = {
      data: emails,
    };

    return res.status(200).json({
      message: "Tous les e-mails ont été récupérés avec succès",
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

const updateEmail = async (req, res) => {
  const emailId = req.params.emailId;
  const { header, footer } = req.body;
  try {
    const existingEmail = await Email.findById(emailId);
    if (!existingEmail) {
      return res.status(404).json({
        message: "Aucun e-mail n'a été trouvé",
        response: null,
        error: "Aucun e-mail n'a été trouvé",
      });
    }

    const duplicateEmail = await Email.findOne({
      name: existingEmail.name,
      _id: { $ne: emailId },
    });
    if (duplicateEmail) {
      return res.status(400).json({
        message: "Les e-mails en double ne sont pas autorisés",
        response: null,
        error: "Les e-mails en double ne sont pas autorisés",
      });
    }

    existingEmail.header = header || existingEmail.header;
    existingEmail.footer = footer || existingEmail.footer;
    await existingEmail.save();

    return res.status(200).json({
      message: "E-mail mis à jour avec succès",
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
  getAllEmails,
  updateEmail,
};
