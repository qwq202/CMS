const { Product } = require('../models');

// @desc    获取所有产品
// @route   GET /api/products
// @access  公开
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: products } = await Product.findAndCountAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: products
    });
  } catch (error) {
    console.error('获取产品列表失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取产品列表失败'
    });
  }
};

// @desc    获取单个产品详情
// @route   GET /api/products/:slug
// @access  公开
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { 
        slug: req.params.slug,
        isActive: true
      }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '产品不存在'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(`获取产品 ${req.params.slug} 失败:`, error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取产品详情失败'
    });
  }
};

// @desc    创建新产品
// @route   POST /api/products
// @access  私有/管理员
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
      message: '产品创建成功'
    });
  } catch (error) {
    console.error('创建产品失败:', error);
    
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
      message: '创建产品失败'
    });
  }
};

// @desc    更新产品
// @route   PUT /api/products/:id
// @access  私有/管理员
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '产品不存在'
      });
    }

    await product.update(req.body);

    res.json({
      success: true,
      data: product,
      message: '产品更新成功'
    });
  } catch (error) {
    console.error(`更新产品 ID:${req.params.id} 失败:`, error);
    
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
      message: '更新产品失败'
    });
  }
};

// @desc    删除产品
// @route   DELETE /api/products/:id
// @access  私有/管理员
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '产品不存在'
      });
    }

    // 软删除 - 只是将产品设置为非激活状态
    await product.update({ isActive: false });
    // 如果要物理删除，可以使用: await product.destroy();

    res.json({
      success: true,
      data: {},
      message: '产品已删除'
    });
  } catch (error) {
    console.error(`删除产品 ID:${req.params.id} 失败:`, error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '删除产品失败'
    });
  }
};
