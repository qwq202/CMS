module.exports = (sequelize, DataTypes) => {
  const Solution = sequelize.define('Solution', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '解决方案名称'
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '解决方案URL标识'
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '适用行业'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '解决方案简介'
    },
    fullDescription: {
      type: DataTypes.TEXT,
      comment: '详细描述'
    },
    image: {
      type: DataTypes.STRING,
      comment: '解决方案图片URL'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '是否激活显示'
    }
  }, {
    tableName: 'solutions',
    timestamps: true,
    comment: '解决方案表'
  });

  return Solution;
};
