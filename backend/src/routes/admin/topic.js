const { Router } = require("express");
const router = Router();
const {
  getAllTopics,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
} = require("../../controllers/admin/topic");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator, paramsValidator } = require("../../middlewares/joi");

router.get("/", verifyAdminToken, getAllTopics);

router.post(
  "/:subjectId",
  verifyAdminToken,
  paramsValidator("createTopicParamsSchema"),
  bodyValidator("createTopicBodySchema"),
  createTopic
);

router.get(
  "/:topicId",
  verifyAdminToken,
  paramsValidator("topicParamsSchema"),
  getTopic
);

router.put(
  "/:topicId",
  verifyAdminToken,
  paramsValidator("topicParamsSchema"),
  bodyValidator("updateTopicBodySchema"),
  updateTopic
);

router.delete(
  "/:topicId",
  verifyAdminToken,
  paramsValidator("topicParamsSchema"),
  deleteTopic
);

module.exports = router;
