/**
 * 数据库模型同步脚本
 * 用于显式地同步所有模型到数据库
 */
const { sequelize } = require('../config/db');
const { User, Product, Solution, Contact, Setting } = require('../models');

// 确保所有模型都被加载和注册
const syncModels = async (force = false) => {
  try {
    console.log(`开始${force ? '强制' : ''}同步数据库模型...`);
    
    // 同步所有模型
    await sequelize.sync({ force });
    
    console.log('数据库模型同步完成');
    return true;
  } catch (error) {
    console.error('数据库模型同步失败:', error);
    return false;
  }
};

module.exports = syncModels;
