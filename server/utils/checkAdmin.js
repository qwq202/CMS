/**
 * 检查管理员账户脚本
 */
require('dotenv').config();
const models = require('../models');

async function checkAdmin() {
  try {
    console.log('正在查询数据库中的管理员账户...');
    const user = await models.User.findOne({
      where: { email: 'admin@yunzhihui.com' },
      attributes: { exclude: ['avatar'] }
    });
    
    if (user) {
      console.log('找到管理员账户:');
      console.log(JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }, null, 2));
      
      // 重置管理员密码
      console.log('重置管理员密码...');
      user.password = 'admin123';
      await user.save();
      console.log('密码已重置为: admin123');
    } else {
      console.log('未找到管理员账户，正在创建...');
      const newAdmin = await models.User.create({
        name: '系统管理员',
        email: 'admin@yunzhihui.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      });
      console.log('管理员账户已创建');
    }
  } catch (error) {
    console.error('检查失败:', error);
  } finally {
    process.exit(0);
  }
}

checkAdmin();
