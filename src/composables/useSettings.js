import { computed, inject } from 'vue';

/**
 * 站点设置Hook
 * 提供便捷的方式获取站点设置
 */
export default function useSettings() {
  // 从上层组件注入设置数据
  const settings = inject('settings', {});
  const loading = inject('settingsLoading', false);
  const error = inject('settingsError', null);
  const reloadSettings = inject('reloadSettings', () => {});
  
  // 获取特定设置
  const getSetting = (key, defaultValue = null) => {
    // 如果settings为空，返回默认值
    if (!settings.value) {
      return defaultValue;
    }
    
    // 遍历所有分组查找设置
    for (const group in settings.value) {
      const foundSetting = settings.value[group]?.find(s => s.key === key);
      if (foundSetting) {
        return foundSetting.value;
      }
    }
    
    // 未找到设置，返回默认值
    return defaultValue;
  };
  
  // 获取某个分组的所有设置
  const getSettingsByGroup = (group) => {
    if (!settings.value || !settings.value[group]) {
      return [];
    }
    
    return settings.value[group] || [];
  };
  
  // 计算属性：站点基本信息
  const siteInfo = computed(() => {
    return {
      name: getSetting('site_name', '云智汇'),
      description: getSetting('site_description', '专注于智能云平台解决方案'),
      email: getSetting('contact_email', 'contact@yunzhihui.com'),
      phone: getSetting('contact_phone', '400-123-4567'),
      address: getSetting('contact_address', '北京市海淀区中关村科技园')
    };
  });
  
  // 计算属性：主题颜色
  const themeColors = computed(() => {
    return {
      primary: getSetting('primary_color', '#3B82F6'),
      secondary: getSetting('secondary_color', '#10B981'),
      accent: getSetting('accent_color', '#F59E0B')
    };
  });
  
  // 计算属性：首页内容
  const homeContent = computed(() => {
    return {
      heroTitle: getSetting('hero_title', '智能云计算解决方案'),
      heroSubtitle: getSetting('hero_subtitle', '为企业提供先进、可靠、安全的云端智能服务'),
      featureSections: getSetting('feature_sections', [])
    };
  });
  
  // 计算属性：SEO信息
  const seoInfo = computed(() => {
    return {
      title: getSetting('seo_title', '云智汇 - 智能云计算解决方案'),
      description: getSetting('seo_description', '专注于为企业提供先进、可靠、安全的云端智能服务'),
      keywords: getSetting('seo_keywords', '云计算,人工智能,数据分析,企业服务')
    };
  });
  
  return {
    getSetting,
    getSettingsByGroup,
    siteInfo,
    themeColors,
    homeContent,
    seoInfo,
    loading,
    error,
    reloadSettings,
    isLoaded: computed(() => !!settings.value && Object.keys(settings.value).length > 0)
  };
}
