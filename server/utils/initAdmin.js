/**
 * 管理员账户初始化脚本
 * 在服务器启动时检查并创建默认管理员账户
 */
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;

const initAdminAccount = async () => {
  try {
    console.log('检查管理员账户...');
    
    // 查找是否已存在管理员账户
    const adminCount = await User.count({
      where: {
        role: 'admin'
      }
    });
    
    // 如果不存在管理员账户，则创建一个默认的管理员账户
    if (adminCount === 0) {
      console.log('未找到管理员账户，创建默认管理员...');
      
      // 密码加密
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin', salt);
      
      // 创建管理员账户
      await User.create({
        name: 'root',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      
      console.log('默认管理员账户创建成功!');
      console.log('- 用户名: root');
      console.log('- 邮箱: admin@example.com');
      console.log('- 密码: admin');
      console.log('请尽快登录并修改默认密码！');
    } else {
      console.log('已存在管理员账户，跳过创建步骤');
    }
  } catch (error) {
    console.error('初始化管理员账户时出错:', error);
  }
};

module.exports = initAdminAccount;
