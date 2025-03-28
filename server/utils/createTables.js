/**
 * 数据库表创建脚本
 * 用于初始化数据库表结构
 */
require('dotenv').config();
const { Sequelize } = require('sequelize');

// 创建Sequelize连接
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: console.log
  }
);

// 加载所有模型
const models = require('../models');

async function createTables() {
  try {
    // 测试数据库连接
    await sequelize.authenticate();
    console.log('数据库连接成功！');

    // 强制创建所有表（会删除已存在的表）
    await sequelize.sync({ force: true });
    console.log('所有表结构已成功创建！');

    // 创建默认管理员账户
    const User = models.User;
    const adminExists = await User.count({ where: { role: 'admin' } });
    
    if (adminExists === 0) {
      await User.create({
        name: '系统管理员',
        email: 'admin@yunzhihui.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('默认管理员账户已创建！');
    }

    console.log('数据库初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败：', error);
    process.exit(1);
  }
}

createTables();
