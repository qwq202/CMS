/**
 * 数据库初始化脚本
 * 用于创建表结构和初始化管理员账户
 */
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('正在连接到数据库...');
console.log(`数据库地址: ${process.env.DB_HOST}`);
console.log(`数据库名称: ${process.env.DB_NAME}`);
console.log(`数据库用户: ${process.env.DB_USER}`);

// 创建数据库连接
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }
);

// 定义用户模型
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor', 'viewer'),
    defaultValue: 'editor'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true
});

// 定义产品模型
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  fullDescription: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'products',
  timestamps: true
});

// 定义解决方案模型
const Solution = sequelize.define('Solution', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  industry: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  fullDescription: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'solutions',
  timestamps: true
});

// 定义联系表单模型
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  company: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'contacts',
  timestamps: true
});

// 初始化数据库
async function initDatabase() {
  try {
    // 测试数据库连接
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 强制创建所有表（这将删除现有表并重新创建）
    await sequelize.sync({ force: true });
    console.log('数据库表结构已创建');

    // 创建管理员账户
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      name: '系统管理员',
      email: 'admin@yunzhihui.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    });
    console.log('管理员账户已创建');

    console.log('数据库初始化完成');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

// 执行初始化
initDatabase();
