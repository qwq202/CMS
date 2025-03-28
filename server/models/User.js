const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户姓名'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
      comment: '邮箱'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码'
    },
    role: {
      type: DataTypes.ENUM('admin', 'editor', 'viewer'),
      defaultValue: 'editor',
      comment: '角色'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '是否激活'
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '上次登录时间'
    }
  }, {
    tableName: 'users',
    timestamps: true,
    comment: '用户表',
    hooks: {
      // 创建用户前加密密码
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // 更新用户前加密密码
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  // 实例方法：检查密码是否匹配
  User.prototype.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  return User;
};
