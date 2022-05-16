import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
AWS.config.loadFromPath(__dirname + '/config/s3.json');

const s3 = new AWS.S3();

// const allowedExtensions = ['png', 'jpg', 'jpeg', '.bmp'];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'portfolioprofilebucket',
    acl: 'public-read',
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? '';
      // const extension = path.extname(file.originalname);
      // if (!allowedExtensions.includes(extension)) {
      //   return callback(new Error('wrong extension'));
      // }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    
  }),
});

module.exports = imageUploader;
