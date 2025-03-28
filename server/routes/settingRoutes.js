const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { protect, authorize } = require('../middleware/auth');

// 公开路由 - 获取所有公开设置
router.get('/public', settingController.getAllSettings);

// 以下路由需要登录才能访问
router.use(protect);

// 以下路由仅限管理员访问
router.use(authorize('admin'));

// 获取所有设置（包括非公开设置）
router.get('/', settingController.getAllSettings);

// 获取单个设置
router.get('/:key', settingController.getSetting);

// 创建或更新设置
router.put('/:key', settingController.updateSetting);

// 删除设置
router.delete('/:key', settingController.deleteSetting);

// 批量更新设置
router.post('/bulk', settingController.bulkUpdateSettings);

module.exports = router;
