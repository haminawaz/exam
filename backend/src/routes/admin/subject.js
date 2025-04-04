const { Router } = require("express");
const router = Router();
const {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../../controllers/admin/subject");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator, paramsValidator } = require("../../middlewares/joi");

router.get("/", verifyAdminToken, getAllSubjects);

router.post(
  "/",
  verifyAdminToken,
  bodyValidator("subjectBodySchema"),
  createSubject
);

router.put(
  "/:subjectId",
  verifyAdminToken,
  paramsValidator("subjectParamsSchema"),
  bodyValidator("subjectBodySchema"),
  updateSubject
);

router.delete(
  "/:subjectId",
  verifyAdminToken,
  paramsValidator("subjectParamsSchema"),
  deleteSubject
);

module.exports = router;
