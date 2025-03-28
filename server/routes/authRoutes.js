const express = require('express');
const router = express.Router();
const { 
  login, 
  getMe, 
  register, 
  updateUser,
  updatePassword
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

// 公开路由
router.post('/login', login);

// 保护路由 - 需要登录
router.use(protect);

router.get('/me', getMe);
router.put('/update', updateUser);
router.put('/password', updatePassword);

// 管理员路由 - 只有管理员可以创建新用户
router.post('/register', authorize('admin'), register);

module.exports = router;
