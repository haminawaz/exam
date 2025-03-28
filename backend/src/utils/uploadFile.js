const fs = require("fs");
const path = require("path");

const imageUpload = async (levelId, file, folderName) => {
  const imagePath = path.join(
    __dirname,
    `../../../frontend/public/images/${folderName}`,
    `level_${levelId}${path.extname(file.originalname)}`
  );

  fs.writeFileSync(imagePath, file.buffer);
  return;
};

const imageDelete = async (image) => {
  const imagePath = path.join(__dirname, `../../../frontend/public/${image}`);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
  return;
};

module.exports = {
  imageUpload,
  imageDelete,
};
