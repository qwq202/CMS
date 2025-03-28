/**
 * 更新联系人表状态字段脚本
 * 将status字段从ENUM('pending', 'processing', 'completed')
 * 修改为ENUM('pending', 'processing', 'completed', 'contacted')
 */
require('dotenv').config();
const { Sequelize } = require('sequelize');

// 创建连接
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log
  }
);

async function updateContactStatusEnum() {
  try {
    // 测试连接
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 执行原生SQL来修改ENUM字段
    await sequelize.query(`
      ALTER TABLE contacts 
      MODIFY COLUMN status ENUM('pending', 'processing', 'completed', 'contacted') 
      NOT NULL DEFAULT 'pending'
    `);

    console.log('成功更新联系人表状态字段');
    process.exit(0);
  } catch (error) {
    console.error('更新失败:', error);
    process.exit(1);
  }
}

updateContactStatusEnum();
