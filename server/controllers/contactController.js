const nodemailer = require('nodemailer');
const { Contact } = require('../models');

// 配置邮件发送器
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// @desc    提交联系表单
// @route   POST /api/contacts
// @access  公开
exports.submitContactForm = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // 发送邮件通知
    await sendNotificationEmail(contact);

    res.status(201).json({
      success: true,
      data: contact,
      message: '您的咨询信息已提交，我们将尽快与您联系。'
    });
  } catch (error) {
    console.error('提交联系表单失败:', error);
    
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
      message: '提交表单失败，请稍后再试'
    });
  }
};

// @desc    获取所有联系表单记录
// @route   GET /api/contacts
// @access  私有/管理员
exports.getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    const { count, rows: contacts } = await Contact.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: contacts
    });
  } catch (error) {
    console.error('获取联系表单列表失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取联系表单列表失败'
    });
  }
};

// @desc    获取单个联系表单详情
// @route   GET /api/contacts/:id
// @access  私有/管理员
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '联系表单记录不存在'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error(`获取联系表单 ID:${req.params.id} 失败:`, error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '获取联系表单详情失败'
    });
  }
};

// @desc    更新联系表单状态
// @route   PUT /api/contacts/:id
// @access  私有/管理员
exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: '未找到',
        message: '联系表单记录不存在'
      });
    }

    // 只允许更新状态字段
    await contact.update({ status: req.body.status });

    res.json({
      success: true,
      data: contact,
      message: '联系表单状态更新成功'
    });
  } catch (error) {
    console.error(`更新联系表单状态 ID:${req.params.id} 失败:`, error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: '更新联系表单状态失败'
    });
  }
};

// 内部函数：发送通知邮件
const sendNotificationEmail = async (contact) => {
  try {
    // 给管理员发送通知
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER, // 管理员邮箱
      subject: `新的咨询信息 - ${contact.name} - ${contact.company || '无公司'}`,
      html: `
        <h2>新的客户咨询信息</h2>
        <p><strong>姓名:</strong> ${contact.name}</p>
        <p><strong>公司:</strong> ${contact.company || '未提供'}</p>
        <p><strong>职位:</strong> ${contact.position || '未提供'}</p>
        <p><strong>邮箱:</strong> ${contact.email}</p>
        <p><strong>电话:</strong> ${contact.phone || '未提供'}</p>
        <p><strong>咨询内容:</strong> ${contact.message}</p>
        <p><strong>感兴趣的产品:</strong> ${contact.interested_in || '未提供'}</p>
        <p><strong>来源:</strong> ${contact.source || '网站'}</p>
        <p><strong>提交时间:</strong> ${contact.createdAt}</p>
        <hr>
        <p>请及时处理该咨询信息</p>
      `
    });

    // 给客户发送确认邮件
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: contact.email,
      subject: '感谢您的咨询 - 云智汇',
      html: `
        <h2>尊敬的 ${contact.name}，您好！</h2>
        <p>感谢您对云智汇的关注和咨询。我们已收到您的咨询信息，我们的专业团队将在24小时内与您取得联系。</p>
        <p>以下是您的咨询内容摘要：</p>
        <p><strong>咨询内容:</strong> ${contact.message}</p>
        <p><strong>提交时间:</strong> ${new Date(contact.createdAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
        <hr>
        <p>如有任何紧急问题，请直接拨打我们的客服热线：400-888-8888</p>
        <p>此邮件为系统自动发送，请勿直接回复。</p>
        <p>祝好，<br>云智汇团队</p>
      `
    });

    console.log('通知邮件发送成功');
    return true;
  } catch (error) {
    console.error('发送通知邮件失败:', error);
    return false;
  }
};
