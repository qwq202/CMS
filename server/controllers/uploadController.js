const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { Setting } = require('../models');

const maxSize = parseInt(process.env.MAX_FILE_SIZE || '5242880');

async function createStorage() {
  const driverSetting = await Setting.findByPk('storage_type');
  const type = driverSetting ? driverSetting.value : process.env.STORAGE_TYPE || 'local';

  if (type === 's3') {
    const accessKey = (await Setting.findByPk('s3_access_key'))?.value || process.env.S3_ACCESS_KEY;
    const secretKey = (await Setting.findByPk('s3_secret_key'))?.value || process.env.S3_SECRET_KEY;
    const bucket = (await Setting.findByPk('s3_bucket'))?.value || process.env.S3_BUCKET;
    const region = (await Setting.findByPk('s3_region'))?.value || process.env.S3_REGION;
    const endpoint = (await Setting.findByPk('s3_endpoint'))?.value || process.env.S3_ENDPOINT;
    const baseUrl = (await Setting.findByPk('s3_base_url'))?.value || process.env.S3_BASE_URL || `${endpoint}/${bucket}`;

    const s3 = new AWS.S3({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
      region,
      endpoint,
      s3ForcePathStyle: !!endpoint
    });

    const storage = multerS3({
      s3,
      bucket,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
      }
    });

    return { storage, baseUrl, type: 's3' };
  }

  const uploadPath = process.env.UPLOAD_PATH || path.join(__dirname, '../uploads');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    }
  });

  return { storage, baseUrl: '/uploads', type: 'local', uploadPath };
}

exports.uploadFile = async (req, res) => {
  try {
    const { storage, baseUrl, type, uploadPath } = await createStorage();
    const upload = multer({ storage, limits: { fileSize: maxSize } }).single('file');
    upload(req, res, (err) => {
      if (err) {
        console.error('文件上传失败:', err);
        return res.status(400).json({ success: false, message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ success: false, message: '未找到上传文件' });
      }
      let filePath;
      if (type === 's3') {
        filePath = req.file.location || `${baseUrl}/${req.file.key}`;
      } else {
        filePath = `${baseUrl}/${req.file.filename}`;
      }
      res.json({
        success: true,
        filename: req.file.filename || req.file.key,
        path: filePath
      });
    });
  } catch (error) {
    console.error('上传处理失败:', error);
    res.status(500).json({ success: false, message: '上传失败' });
  }
};
