/**
 * 初始化站点设置脚本
 * 创建基本的默认设置项
 */
const { Setting } = require('../models');

const defaultSettings = [
  // 站点基本信息
  {
    key: 'site_name',
    value: '云智汇',
    type: 'text',
    group: 'general',
    label: '站点名称',
    description: '网站的名称，将显示在浏览器标题和页面顶部',
    isPublic: true
  },
  {
    key: 'site_description',
    value: '专注于智能云平台解决方案',
    type: 'text',
    group: 'general',
    label: '站点描述',
    description: '网站的简短描述，用于搜索引擎优化',
    isPublic: true
  },
  {
    key: 'contact_email',
    value: 'contact@yunzhihui.com',
    type: 'text',
    group: 'contact',
    label: '联系邮箱',
    description: '显示在联系我们页面的联系邮箱',
    isPublic: true
  },
  {
    key: 'contact_phone',
    value: '400-123-4567',
    type: 'text',
    group: 'contact',
    label: '联系电话',
    description: '显示在联系我们页面的联系电话',
    isPublic: true
  },
  {
    key: 'contact_address',
    value: '北京市海淀区中关村科技园',
    type: 'text',
    group: 'contact',
    label: '公司地址',
    description: '显示在联系我们页面的公司地址',
    isPublic: true
  },
  
  // 主题设置
  {
    key: 'primary_color',
    value: '#3B82F6',
    type: 'text',
    group: 'theme',
    label: '主题主色',
    description: '网站的主题主色，影响按钮和重点元素',
    isPublic: true
  },
  {
    key: 'secondary_color',
    value: '#10B981',
    type: 'text',
    group: 'theme',
    label: '主题辅色',
    description: '网站的主题辅色，影响次要按钮和元素',
    isPublic: true
  },
  {
    key: 'accent_color',
    value: '#F59E0B',
    type: 'text',
    group: 'theme',
    label: '强调色',
    description: '用于强调特定元素的颜色',
    isPublic: true
  },
  
  // 首页设置
  {
    key: 'hero_title',
    value: '智能云计算解决方案',
    type: 'text',
    group: 'homepage',
    label: '首页标题',
    description: '首页主标题文字',
    isPublic: true
  },
  {
    key: 'hero_subtitle',
    value: '为企业提供先进、可靠、安全的云端智能服务',
    type: 'text',
    group: 'homepage',
    label: '首页副标题',
    description: '首页副标题文字',
    isPublic: true
  },
  {
    key: 'feature_sections',
    value: JSON.stringify([
      {
        title: '高效数据处理',
        description: '使用先进算法快速处理海量数据',
        icon: 'database'
      },
      {
        title: '智能决策支持',
        description: '基于AI的智能分析和决策推荐',
        icon: 'brain'
      },
      {
        title: '安全可靠',
        description: '多层次安全防护，保障数据安全',
        icon: 'shield'
      }
    ]),
    type: 'json',
    group: 'homepage',
    label: '特色版块',
    description: '首页特色功能展示区块',
    isPublic: true
  },
  
  // SEO设置
  {
    key: 'meta_keywords',
    value: '云计算,大数据,人工智能,云平台,数据分析',
    type: 'text',
    group: 'seo',
    label: 'Meta关键词',
    description: '用于SEO的关键词标签，多个关键词用逗号分隔',
    isPublic: true
  },
  {
    key: 'meta_description',
    value: '云智汇提供先进的云计算解决方案，帮助企业提升效率，降低成本，加速数字化转型。',
    type: 'text',
    group: 'seo',
    label: 'Meta描述',
    description: '用于SEO的网站描述',
    isPublic: true
  },
  
  // 社交媒体
  {
    key: 'social_links',
    value: JSON.stringify({
      weixin: 'yunzhihui',
      weibo: 'yunzhihui',
      qq: '123456789'
    }),
    type: 'json',
    group: 'social',
    label: '社交媒体链接',
    description: '各社交媒体账号信息',
    isPublic: true
  },
  
  // 系统设置
  {
    key: 'maintenance_mode',
    value: 'false',
    type: 'boolean',
    group: 'system',
    label: '维护模式',
    description: '是否开启网站维护模式，开启后前台将显示维护页面',
    isPublic: false
  },
  {
    key: 'analytics_code',
    value: '',
    type: 'text',
    group: 'system',
    label: '统计代码',
    description: '网站统计代码，如百度统计、CNZZ等',
    isPublic: false
  }
];

/**
 * 初始化默认设置
 */
const initSettings = async () => {
  try {
    console.log('检查站点设置...');
    
    // 获取现有设置数量
    const count = await Setting.count();
    
    if (count > 0) {
      console.log(`已存在${count}个站点设置，跳过初始化`);
      return;
    }
    
    // 批量创建默认设置
    await Promise.all(
      defaultSettings.map(setting => 
        Setting.create(setting)
      )
    );
    
    console.log(`成功创建${defaultSettings.length}个默认站点设置`);
  } catch (error) {
    console.error('初始化站点设置失败:', error);
  }
};

module.exports = initSettings;
