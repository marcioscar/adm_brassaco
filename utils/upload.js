import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

aws.config.update({
  secretAccessKey: process.env.MSC_SECRET_KEY,
  accessKeyId: process.env.MSC_ACCESS_KEY,
  region: process.env.MSC_REGION,
});

var s3 = new aws.S3({
  /* ... */
});

const datanome = Date.now();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.MSC_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = `${datanome} - ${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

export default upload;
