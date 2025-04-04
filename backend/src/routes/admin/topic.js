const { Router } = require("express");
const router = Router();
const {
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../../controllers/admin/topic");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator, paramsValidator } = require("../../middlewares/joi");

router.get("/", verifyAdminToken, getAllTopics);

router.post(
  "/",
  verifyAdminToken,
  bodyValidator("topicBodySchema"),
  createTopic
);

router.put(
  "/:topicId",
  verifyAdminToken,
  paramsValidator("topicParamsSchema"),
  bodyValidator("topicBodySchema"),
  updateTopic
);

router.delete(
  "/:topicId",
  verifyAdminToken,
  paramsValidator("topicParamsSchema"),
  deleteTopic
);

module.exports = router;
