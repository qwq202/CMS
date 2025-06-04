const { Setting } = require('../models');
const eventBus = require('../utils/eventBus');

// 获取所有设置
exports.getAllSettings = async (req, res) => {
  try {
    const isPublicOnly = req.query.public === 'true';
    let whereClause = {};
    
    if (isPublicOnly) {
      whereClause.isPublic = true;
    }
    
    const settings = await Setting.findAll({
      where: whereClause,
      order: [['group', 'ASC'], ['key', 'ASC']]
    });
    
    // 将设置按组进行分组
    const groupedSettings = settings.reduce((acc, setting) => {
      if (!acc[setting.group]) {
        acc[setting.group] = [];
      }
      
      // 转换值的类型
      let value = setting.value;
      if (setting.type === 'number') {
        value = parseFloat(value);
      } else if (setting.type === 'boolean') {
        value = value === 'true';
      } else if (setting.type === 'json') {
        try {
          value = JSON.parse(value);
        } catch (e) {
          value = null;
        }
      }
      
      acc[setting.group].push({
        ...setting.toJSON(),
        value
      });
      
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: groupedSettings
    });
  } catch (error) {
    console.error('获取设置失败:', error);
    res.status(500).json({
      success: false,
      message: '获取设置失败',
      error: error.message
    });
  }
};

// 获取单个设置
exports.getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    
    const setting = await Setting.findByPk(key);
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: '设置不存在'
      });
    }
    
    // 非公开设置只有管理员可查看
    if (!setting.isPublic && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: '无权限查看此设置'
      });
    }
    
    // 转换值的类型
    let value = setting.value;
    if (setting.type === 'number') {
      value = parseFloat(value);
    } else if (setting.type === 'boolean') {
      value = value === 'true';
    } else if (setting.type === 'json') {
      try {
        value = JSON.parse(value);
      } catch (e) {
        value = null;
      }
    }
    
    res.json({
      success: true,
      data: {
        ...setting.toJSON(),
        value
      }
    });
  } catch (error) {
    console.error('获取设置失败:', error);
    res.status(500).json({
      success: false,
      message: '获取设置失败',
      error: error.message
    });
  }
};

// 创建或更新设置
exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, type, group, label, description, isPublic } = req.body;
    
    // 查找是否已存在
    let setting = await Setting.findByPk(key);
    
    // 序列化值
    let serializedValue = value;
    if (type === 'boolean') {
      serializedValue = value ? 'true' : 'false';
    } else if (type === 'json') {
      serializedValue = JSON.stringify(value);
    } else if (type === 'number') {
      serializedValue = value.toString();
    }
    
    if (setting) {
      // 更新已有设置
      await setting.update({
        value: serializedValue,
        type: type || setting.type,
        group: group || setting.group,
        label: label || setting.label,
        description: description || setting.description,
        isPublic: isPublic !== undefined ? isPublic : setting.isPublic
      });
    } else {
      // 创建新设置
      setting = await Setting.create({
        key,
        value: serializedValue,
        type: type || 'text',
        group: group || 'general',
        label: label || key,
        description: description || '',
        isPublic: isPublic !== undefined ? isPublic : true
      });
    }
    
    res.json({
      success: true,
      data: setting,
      message: '设置已保存'
    });
    eventBus.emit('settingsUpdated');
  } catch (error) {
    console.error('保存设置失败:', error);
    res.status(500).json({
      success: false,
      message: '保存设置失败',
      error: error.message
    });
  }
};

// 删除设置
exports.deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;
    
    const setting = await Setting.findByPk(key);
    
    if (!setting) {
      return res.status(404).json({
        success: false,
        message: '设置不存在'
      });
    }
    
    await setting.destroy();
    
    res.json({
      success: true,
      message: '设置已删除'
    });
  } catch (error) {
    console.error('删除设置失败:', error);
    res.status(500).json({
      success: false,
      message: '删除设置失败',
      error: error.message
    });
  }
};

// 批量更新设置
exports.bulkUpdateSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    
    if (!Array.isArray(settings)) {
      return res.status(400).json({
        success: false,
        message: '无效的设置数据'
      });
    }
    
    for (const item of settings) {
      const { key, value, type, group, label, description, isPublic } = item;
      
      // 序列化值
      let serializedValue = value;
      if (type === 'boolean') {
        serializedValue = value ? 'true' : 'false';
      } else if (type === 'json') {
        serializedValue = JSON.stringify(value);
      } else if (type === 'number') {
        serializedValue = value.toString();
      }
      
      // 查找是否已存在
      let setting = await Setting.findByPk(key);
      
      if (setting) {
        // 更新已有设置
        await setting.update({
          value: serializedValue,
          type: type || setting.type,
          group: group || setting.group,
          label: label || setting.label,
          description: description || setting.description,
          isPublic: isPublic !== undefined ? isPublic : setting.isPublic
        });
      } else {
        // 创建新设置
        await Setting.create({
          key,
          value: serializedValue,
          type: type || 'text',
          group: group || 'general',
          label: label || key,
          description: description || '',
          isPublic: isPublic !== undefined ? isPublic : true
        });
      }
    }
    
    res.json({
      success: true,
      message: '所有设置已保存'
    });
    eventBus.emit('settingsUpdated');
  } catch (error) {
    console.error('批量保存设置失败:', error);
    res.status(500).json({
      success: false,
      message: '批量保存设置失败',
      error: error.message
    });
  }
};
