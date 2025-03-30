const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidationError =
        "Only JPEG, JPG, PNG, and SVG file formats are allowed";
      cb(null, false);
    }
  },
});

const validateFile = (functionName) => {
  return (req, res, next) => {
    if (req.fileValidationError) {
      return res.status(403).json({
        message: req.fileValidationError,
        response: null,
        error: req.fileValidationError,
      });
    }

    if (functionName === "createLevel") {
      if (!req.file) {
        return res.status(403).json({
          message: "Image is required",
          response: null,
          error: "Image is required",
        });
      }
    }

    if (functionName === "createAvatar") {
      if (!req.file) {
        return res.status(403).json({
          message: "Avatar is required",
          response: null,
          error: "Avatar is required",
        });
      }
    }

    next();
  };
};

module.exports = {
  upload,
  validateFile,
};
