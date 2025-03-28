/**
 * 手动创建设置表的脚本
 * 用于解决自动同步无法创建设置表的问题
 */
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const createSettingsTable = async () => {
  try {
    console.log('开始手动创建settings表...');
    
    // 直接使用queryInterface定义表
    await sequelize.getQueryInterface().createTable('settings', {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        comment: '设置键名'
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '设置值'
      },
      group: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'general',
        comment: '设置分组'
      },
      type: {
        type: DataTypes.ENUM('text', 'number', 'boolean', 'json', 'image'),
        defaultValue: 'text',
        comment: '设置值类型'
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '设置显示名称'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '设置描述'
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '是否公开（前端可见）'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
    
    console.log('settings表创建成功');
    return true;
  } catch (error) {
    if (error.name === 'SequelizeTableExistsError') {
      console.log('settings表已存在，无需创建');
      return true;
    }
    
    console.error('创建settings表失败:', error);
    return false;
  }
};

module.exports = createSettingsTable;
