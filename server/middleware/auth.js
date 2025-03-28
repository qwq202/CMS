const jwt = require('jsonwebtoken');
const { User } = require('../models');

// 保护路由 - 验证用户是否已登录
exports.protect = async (req, res, next) => {
  let token;

  // 从请求头中获取token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // 设置格式为 Bearer {token}
    token = req.headers.authorization.split(' ')[1];
  }

  // 检查token是否存在
  if (!token) {
    return res.status(401).json({
      success: false,
      error: '未授权',
      message: '没有访问权限，请先登录'
    });
  }

  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token已解码:', decoded);

    // 查找用户
    const user = await User.findByPk(decoded.id);
    console.log('查找用户结果:', user ? '用户存在' : '用户不存在');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: '未授权',
        message: '用户不存在'
      });
    }

    // 检查用户是否被禁用
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: '账户已禁用',
        message: '您的账户已被禁用，请联系管理员'
      });
    }

    // 将用户信息添加到请求对象中
    req.user = user;
    next();
  } catch (error) {
    console.log('身份验证错误:', error);
    return res.status(401).json({
      success: false,
      error: '未授权',
      message: '认证失败，请重新登录'
    });
  }
};

// 授权访问 - 检查用户角色
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: '禁止访问',
        message: '您没有执行此操作的权限'
      });
    }
    next();
  };
};
