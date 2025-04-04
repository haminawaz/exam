const { Router } = require("express");
const router = Router();
const {
  getAllQuestions,
  getAllTopics,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../../controllers/admin/question");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator, paramsValidator } = require("../../middlewares/joi");

router.get("/", verifyAdminToken, getAllQuestions);

router.get("/topic", verifyAdminToken, getAllTopics);

router.post(
  "/",
  verifyAdminToken,
  bodyValidator("questionBodySchema"),
  createQuestion
);

router.put(
  "/:questionId",
  verifyAdminToken,
  paramsValidator("questionParamsSchema"),
  bodyValidator("questionBodySchema"),
  updateQuestion
);

router.delete(
  "/:questionId",
  verifyAdminToken,
  paramsValidator("questionParamsSchema"),
  deleteQuestion
);

module.exports = router;
