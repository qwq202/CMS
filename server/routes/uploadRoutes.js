const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');

// 上传文件（管理员或编辑）
router.post('/', protect, authorize('admin', 'editor'), uploadFile);

module.exports = router;
