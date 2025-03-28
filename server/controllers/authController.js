const { User } = require('../models');
const jwt = require('jsonwebtoken');

// 生成JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    用户登录
// @route   POST /api/auth/login
// @access  公开
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 验证请求
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: '请求数据不完整',
        message: '请提供邮箱和密码'
      });
    }

    // 检查用户是否存在
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: '认证失败',
        message: '邮箱或密码错误'
      });
    }

    // 验证密码
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: '认证失败',
        message: '邮箱或密码错误'
      });
    }

    // 检查账户是否激活
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: '账户已禁用',
        message: '您的账户已被禁用，请联系管理员'
      });
    }

    // 更新最后登录时间
    await user.update({ lastLogin: new Date() });

    // 生成Token
    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      message: '登录成功'
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '登录失败，请稍后再试'
    });
  }
};

// @desc    获取当前登录用户信息
// @route   GET /api/auth/me
// @access  私有
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '用户不存在'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取用户信息失败'
    });
  }
};

// @desc    注册新用户（仅管理员可用）
// @route   POST /api/auth/register
// @access  私有/管理员
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 检查邮箱是否已存在
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({
        success: false,
        error: '邮箱已存在',
        message: '该邮箱已被注册'
      });
    }

    // 创建用户
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'viewer'
    });

    // 返回用户信息（排除密码）
    const userData = user.toJSON();
    delete userData.password;

    res.status(201).json({
      success: true,
      data: userData,
      message: '用户创建成功'
    });
  } catch (error) {
    console.error('用户注册失败:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: '数据验证失败',
        message: error.errors.map(e => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '用户注册失败'
    });
  }
};

// @desc    更新用户信息
// @route   PUT /api/auth/update
// @access  私有
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '用户不存在'
      });
    }

    // 不允许通过此路由更新用户角色
    const { name } = req.body;
    const updatedUser = await user.update({
      name: name || user.name
    });

    // 返回更新后的用户信息（排除密码）
    const userData = updatedUser.toJSON();
    delete userData.password;

    res.json({
      success: true,
      data: userData,
      message: '用户信息更新成功'
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        error: '数据验证失败',
        message: error.errors.map(e => e.message).join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '更新用户信息失败'
    });
  }
};

// @desc    更新密码
// @route   PUT /api/auth/password
// @access  私有
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: '请求数据不完整',
        message: '请提供当前密码和新密码'
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '用户不存在'
      });
    }

    // 验证当前密码
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: '密码错误',
        message: '当前密码不正确'
      });
    }

    // 更新密码
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: '密码更新成功'
    });
  } catch (error) {
    console.error('更新密码失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '更新密码失败'
    });
  }
};
