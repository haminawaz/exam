const { configurations } = require("../config/config.js");
const { s3 } = require("../config/s3.js");

const bucketName = configurations.bucketName;

const sanitizeFileName = (fileName) => {
  return fileName.replace(/[^a-zA-Z0-9\-_\.]/g, '_');
};

const uploadFileS3 = async (documentFile, folder, oldFileUrl) => {
  const originalFileName = documentFile.originalname;
  const file_extension = originalFileName.split(".").pop();
  const fileNameWithoutExtension = originalFileName.replace(
    `.${file_extension}`,
    ""
  );
  const sanitizedFileName = sanitizeFileName(fileNameWithoutExtension);
  const currentDate = new Date().toISOString().slice(0, 19).replace(/-/g, "");
  const fileName = `${folder}/${sanitizedFileName}_${currentDate}.${file_extension}`;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: documentFile.buffer,
    ContentType: documentFile.mimetype,
  };

  await s3.putObject(params).promise();

  if (oldFileUrl) {
    const key = oldFileUrl.replace(
      `https://${bucketName}.s3.amazonaws.com/`,
      ""
    );
    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };
    await s3.deleteObject(deleteParams).promise();
  }

  const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  return fileUrl;
};

const deleteFileS3 = async (oldFileUrl) => {
  const key = oldFileUrl.replace(`https://${bucketName}.s3.amazonaws.com/`, "");
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  };
  await s3.deleteObject(deleteParams).promise();
  return true;
};

module.exports = {
  uploadFileS3,
  deleteFileS3,
};
