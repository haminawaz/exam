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
        "Seuls les formats de fichiers JPEG,JPG,PNG et SVG sont autorisés";
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
          message: "L'image est requise",
          response: null,
          error: "L'image est requise",
        });
      }
    }

    if (functionName === "createAvatar") {
      if (!req.file) {
        return res.status(403).json({
          message: "L'avatar est obligatoire",
          response: null,
          error: "L'avatar est obligatoire",
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
