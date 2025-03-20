const noreplyEmail = process.env.NOREPLY_EMAIL;
const adminToEmail = process.env.ADMIN_TO_EMAIL;

const configs = {
  adminToEmail: adminToEmail,
  mailgunConfig: {
    domain: process.env.MAILGUN_DOMAIN,
    apiKey: process.env.MAILGUN_API_KEY,
  },
  templates: {
    buyerOrderNotification: {
      from: noreplyEmail,
      subject: "NBOX - Order Notification",
      name: "nbox-order-notification-buyer",
    },
    merchantOrderNotification: {
      from: noreplyEmail,
      subject: "NBOX - Order Notification",
      name: "nbox-order-notification-merchant",
    },
    outForDeliveryNotificationBuyer: {
      from: noreplyEmail,
      name: "nbox-order-out-for-delivery-notification",
    },
    orderCompletedNotificationBuyer: {
      from: noreplyEmail,
      name: "nbox-order-completion-and-feedback-request",
    },
    orderDeliveredNotificationMerchant: {
      from: noreplyEmail,
      name: "nbox-order-delivered-merchant-notification",
    },
    merchantLowStockNotification: {
      from: noreplyEmail,
      name: "nbox-merchant-low-stock-notification",
    },
    adminOrderReadyNotification: {
      from: noreplyEmail,
      name: "nbox-admin-order-ready-notification",
    },
    agentOrderAssignNotification: {
      from: noreplyEmail,
      name: "nbox-agent-order-assign-notification",
    },
    merchantOrderAssignNotification: {
      from: noreplyEmail,
      name: "nbox-merchant-order-assign-notification",
    },
    adminOrderRejectByAgentNotification: {
      from: noreplyEmail,
      name: "nbox-admin-order-reject-by-agent-notification",
    },
  },
};

module.exports = {
  configs,
};
