const path = require('path');
const multer = require('multer');

const uploadPath = process.env.UPLOAD_PATH || path.join(__dirname, '../uploads');
const maxSize = parseInt(process.env.MAX_FILE_SIZE || '5242880');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: maxSize } }).single('file');

exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('文件上传失败:', err);
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: '未找到上传文件' });
    }
    res.json({
      success: true,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`
    });
  });
};
