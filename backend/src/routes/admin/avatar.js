const { Router } = require("express");
const router = Router();
const {
  getAllAvatars,
  createAvatar,
  //   updateLevel,
  deleteAvatar,
} = require("../../controllers/admin/avatar");
const { paramsValidator } = require("../../middlewares/joi");
const { verifyAdminToken } = require("../../middlewares/authMiddleware");
const { upload, validateFile } = require("../../middlewares/fileValidation");

router.get("/", verifyAdminToken, getAllAvatars);

router.post(
  "/",
  verifyAdminToken,
  upload.single("avatarImage"),
  validateFile("createAvatar"),
  createAvatar
);

// router.put(
//   "/:avatarId",
//   verifyAdminToken,
//   upload.single("levelImage"),
//   validateFile(),
//   paramsValidator("avatarParamsSchema"),
//   updateLevel
// );

router.delete(
  "/:avatarId",
  verifyAdminToken,
  paramsValidator("avatarParamsSchema"),
  deleteAvatar
);

module.exports = router;
