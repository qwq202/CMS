module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '联系人姓名'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      comment: '电子邮箱'
    },
    phone: {
      type: DataTypes.STRING,
      comment: '联系电话'
    },
    company: {
      type: DataTypes.STRING,
      comment: '公司名称'
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '咨询内容'
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'contacted', 'closed'),
      defaultValue: 'pending',
      comment: '处理状态'
    }
  }, {
    tableName: 'contacts',
    timestamps: true
  });

  return Contact;
};
