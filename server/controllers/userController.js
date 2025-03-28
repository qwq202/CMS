const asyncHandler = require('../middleware/async');
const { User } = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcryptjs');

// @desc    获取所有用户
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }, // 排除密码字段
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    获取单个用户
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] } // 排除密码字段
  });

  if (!user) {
    return next(new ErrorResponse(`未找到ID为 ${req.params.id} 的用户`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    创建用户
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  // 检查邮箱是否已存在
  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    return next(new ErrorResponse('该邮箱已被注册', 400));
  }

  // 创建用户
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

// @desc    更新用户
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  // 查找用户
  let user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`未找到ID为 ${req.params.id} 的用户`, 404));
  }

  // 如果要更新邮箱，检查是否已存在
  if (req.body.email && req.body.email !== user.email) {
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return next(new ErrorResponse('该邮箱已被其他用户使用', 400));
    }
  }

  // 不允许通过此路由更新密码
  const { password, ...updateData } = req.body;

  // 更新用户
  await user.update(updateData);

  // 重新获取更新后的用户（不包含密码）
  user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password'] }
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    删除用户
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  // 不允许删除自己
  if (req.params.id === req.user.id) {
    return next(new ErrorResponse('不能删除当前登录的用户', 400));
  }

  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`未找到ID为 ${req.params.id} 的用户`, 404));
  }

  await user.destroy();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    重置用户密码
// @route   POST /api/users/:id/reset-password
// @access  Private/Admin
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return next(new ErrorResponse('请提供新密码', 400));
  }

  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`未找到ID为 ${req.params.id} 的用户`, 404));
  }

  // 加密新密码
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // 更新密码
  await user.update({ password: hashedPassword });

  res.status(200).json({
    success: true,
    message: '密码重置成功'
  });
});
