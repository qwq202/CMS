const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUserById, 
  createUser,
  updateUser,
  deleteUser,
  resetPassword
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// 所有用户路由都需要身份验证
router.use(protect);

// 仅管理员可访问的路由
router.use(authorize('admin'));

// 获取所有用户
router.get('/', getUsers);

// 获取单个用户
router.get('/:id', getUserById);

// 创建用户
router.post('/', createUser);

// 更新用户
router.put('/:id', updateUser);

// 删除用户
router.delete('/:id', deleteUser);

// 重置用户密码
router.post('/:id/reset-password', resetPassword);

module.exports = router;
