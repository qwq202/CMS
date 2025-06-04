const { Solution } = require('../models');

// @desc    获取所有解决方案
// @route   GET /api/solutions
// @access  公开
exports.getSolutions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: solutions } = await Solution.findAndCountAll({
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
      data: solutions
    });
  } catch (error) {
    console.error('获取解决方案列表失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取解决方案列表失败'
    });
  }
};

// @desc    获取单个解决方案详情
// @route   GET /api/solutions/:slug
// @access  公开
exports.getSolutionBySlug = async (req, res) => {
  try {
    const solution = await Solution.findOne({
      where: { 
        slug: req.params.slug,
        isActive: true
      }
    });

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '解决方案不存在'
      });
    }

    res.json({
      success: true,
      data: solution
    });
  } catch (error) {
    console.error(`获取解决方案 ${req.params.slug} 失败:`, error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取解决方案详情失败'
    });
  }
};

// @desc    按行业获取解决方案
// @route   GET /api/solutions/industry/:industry
// @access  公开
exports.getSolutionsByIndustry = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: solutions } = await Solution.findAndCountAll({
      where: {
        industry: req.params.industry,
        isActive: true
      },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: solutions
    });
  } catch (error) {
    console.error(`获取${req.params.industry}行业解决方案失败:`, error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取行业解决方案失败'
    });
  }
};

// @desc    创建新解决方案
// @route   POST /api/solutions
// @access  私有/管理员
exports.createSolution = async (req, res) => {
  try {
    const solution = await Solution.create(req.body);

    res.status(201).json({
      success: true,
      data: solution,
      message: '解决方案创建成功'
    });
  } catch (error) {
    console.error('创建解决方案失败:', error);
    
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
      message: '创建解决方案失败'
    });
  }
};

// @desc    更新解决方案
// @route   PUT /api/solutions/:id
// @access  私有/管理员
exports.updateSolution = async (req, res) => {
  try {
    const solution = await Solution.findByPk(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '解决方案不存在'
      });
    }

    await solution.update(req.body);

    res.json({
      success: true,
      data: solution,
      message: '解决方案更新成功'
    });
  } catch (error) {
    console.error(`更新解决方案 ID:${req.params.id} 失败:`, error);
    
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
      message: '更新解决方案失败'
    });
  }
};

// @desc    删除解决方案
// @route   DELETE /api/solutions/:id
// @access  私有/管理员
exports.deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findByPk(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '解决方案不存在'
      });
    }

    // 软删除 - 只是将解决方案设置为非激活状态
    await solution.update({ isActive: false });
    // 如果要物理删除，可以使用: await solution.destroy();

    res.json({
      success: true,
      data: {},
      message: '解决方案已删除'
    });
  } catch (error) {
    console.error(`删除解决方案 ID:${req.params.id} 失败:`, error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '删除解决方案失败'
    });
  }
};
