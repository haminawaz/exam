const fs = require("fs");
const path = require("path");

const imageUpload = async (levelId, file, folderName) => {
  const folderPath = path.join(__dirname, `../../uploads/${folderName}`);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const imagePath = path.join(
    __dirname,
    `../../uploads/${folderName}`,
    `level_${levelId}${path.extname(file.originalname)}`
  );

  fs.writeFileSync(imagePath, file.buffer);
  return;
};

const imageDelete = async (image) => {
  const imagePath = path.join(__dirname, `../../uploads/${image}`);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
  return;
};

module.exports = {
  imageUpload,
  imageDelete,
};
