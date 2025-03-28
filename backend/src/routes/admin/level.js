const { Router } = require("express");
const router = Router();
const {
  getAllLevels,
  createLevel,
  getLevel,
  updateLevel,
  deleteLevel,
} = require("../../controllers/admin/level");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { bodyValidator, paramsValidator } = require("../../middlewares/joi");
const { upload, validateFile } = require("../../middlewares/fileValidation");

router.get("/", verifyAdminToken, getAllLevels);

router.post(
  "/",
  verifyAdminToken,
  upload.single("levelImage"),
  validateFile("createLevel"),
  bodyValidator("levelBodySchema"),
  createLevel
);

router.get(
  "/:levelId",
  verifyAdminToken,
  paramsValidator("levelParamsSchema"),
  getLevel
);

router.put(
  "/:levelId",
  verifyAdminToken,
  upload.single("levelImage"),
  validateFile(),
  paramsValidator("levelParamsSchema"),
  bodyValidator("levelBodySchema"),
  updateLevel
);

router.delete(
  "/:levelId",
  verifyAdminToken,
  paramsValidator("levelParamsSchema"),
  deleteLevel
);

module.exports = router;
