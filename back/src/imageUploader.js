import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: 'AKIAQXNGGNNGCL5MM3VY',
  secretAccessKey: 'opbdvot + cx5fSveycbB2GtuyPMWzXW5EM6t8V2 / e',
});
const s3 = new AWS.S3();

const allowedExtensions = ['png', 'jpg', 'jpeg', '.bmp'];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'portfolioprofilebucket',
    key: (req, file, callback) => {
      const uploadDirectory = req.query.diectory ?? '';
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('wrong extension'));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: 'public-read-write',
  }),
});

export default imageUploader;
