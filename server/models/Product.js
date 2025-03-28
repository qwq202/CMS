module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '产品名称'
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '产品URL标识'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '产品简介'
    },
    fullDescription: {
      type: DataTypes.TEXT,
      comment: '详细描述'
    },
    image: {
      type: DataTypes.STRING,
      comment: '产品图片URL'
    },
    category: {
      type: DataTypes.STRING,
      comment: '产品类别'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '是否激活显示'
    }
  }, {
    tableName: 'products',
    timestamps: true,
    comment: '产品表'
  });

  return Product;
};
