const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db');
const { User, Product, Solution, Contact, Setting } = require('./models'); // 显式导入所有模型
const initAdminAccount = require('./utils/initAdmin'); // 引入管理员初始化脚本
const initSettings = require('./utils/initSettings'); // 引入基本设置初始化脚本
const initDefaultSettings = require('./utils/initDefaultSettings'); // 引入动态内容默认设置脚本
const createSettingsTable = require('./utils/createSettingsTable'); // 引入创建设置表脚本

// 加载环境变量
dotenv.config();

// 初始化Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// API路由
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/solutions', require('./routes/solutionRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// 健康检查端点 - 用于Docker容器健康检查
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'yunzhihui-cms-server',
    uptime: process.uptime()
  });
});

// 初始页面路由 - 用于SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : '请联系管理员'
  });
});

// 端口设置
const PORT = process.env.PORT || 5000;

// 数据库连接与服务器启动
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 同步数据库模型
    await sequelize.sync({ force: true });
    console.log('数据库模型同步完成');
    
    // 确保设置表存在
    await createSettingsTable();

    // 初始化管理员账户
    await initAdminAccount();
    await initSettings();
    await initDefaultSettings();

    app.listen(PORT, () => {
      console.log(`服务器运行在端口 ${PORT}`);
    });
  } catch (error) {
    console.error('无法启动服务器:', error);
    process.exit(1);
  }
};

startServer();
