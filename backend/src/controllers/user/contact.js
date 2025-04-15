const { sendMail } = require("../../utils/sendMail.js");
const { configurations } = require("../../config/config.js");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const emailTemplate = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Objet:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const dynamicData = {
      subject: `Message de contact: ${subject}`,
      to_email: configurations.gmailUser,
    };

    await sendMail(emailTemplate, dynamicData);

    return res.status(200).json({
      message: "Message envoyé avec succès",
      response: null,
      error: null,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  sendContactMessage,
};
