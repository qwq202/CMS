const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建Sequelize实例
const sequelize = new Sequelize(
  process.env.DB_NAME || 'cloud_intelligence',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+08:00' // 中国时区
  }
);

module.exports = { sequelize, Sequelize };
