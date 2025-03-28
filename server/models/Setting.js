const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Setting = sequelize.define('Setting', {
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
    }
  }, {
    tableName: 'settings',
    timestamps: true
  });

  return Setting;
};
