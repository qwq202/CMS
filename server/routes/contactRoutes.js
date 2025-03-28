const express = require('express');
const router = express.Router();
const { 
  submitContactForm, 
  getContacts, 
  getContactById, 
  updateContactStatus 
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// 公开路由
router.post('/', submitContactForm);

// 保护路由 - 需要登录
router.use(protect);

// 管理员路由 - 需要管理员或编辑权限
router.get('/', authorize('admin', 'editor'), getContacts);
router.get('/:id', authorize('admin', 'editor'), getContactById);
router.put('/:id', authorize('admin', 'editor'), updateContactStatus);

module.exports = router;
