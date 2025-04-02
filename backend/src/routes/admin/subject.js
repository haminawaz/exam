const { Router } = require("express");
const router = Router();
const {
  getAllSubjects,
  createSubject,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../../controllers/admin/subject");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator, paramsValidator } = require("../../middlewares/joi");

router.get("/", verifyAdminToken, getAllSubjects);

router.post(
  "/:levelId",
  verifyAdminToken,
  paramsValidator("createSubjectParamsSchema"),
  bodyValidator("createSubjectBodySchema"),
  createSubject
);

router.get(
  "/:subjectId",
  verifyAdminToken,
  paramsValidator("subjectParamsSchema"),
  getSubject
);

router.put(
  "/:subjectId",
  verifyAdminToken,
  paramsValidator("subjectParamsSchema"),
  bodyValidator("updateSubjectBodySchema"),
  updateSubject
);

router.delete(
  "/:subjectId",
  verifyAdminToken,
  paramsValidator("subjectParamsSchema"),
  deleteSubject
);

module.exports = router;
