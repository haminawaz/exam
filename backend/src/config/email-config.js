const noreplyEmail = process.env.NOREPLY_EMAIL;
const adminToEmail = process.env.ADMIN_TO_EMAIL;

const configs = {
  adminToEmail: adminToEmail,
  mailgunConfig: {
    domain: process.env.MAILGUN_DOMAIN,
    apiKey: process.env.MAILGUN_API_KEY,
  },
  templates: {
    accesSecOrder: {
      from: noreplyEmail,
      name: "acces-sec-order",
    },
    accesSecUserCreation: {
      from: noreplyEmail,
      name: "acces-sec-user-creation",
    },
    accessSecResult: {
      from: noreplyEmail,
      name: "access-sec-result",
    },
  },
};

module.exports = {
  configs,
};
