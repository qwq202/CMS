<template>
  <div>
    <!-- 加载中或错误状态显示 -->
    <div v-if="loading || error" class="fixed top-0 left-0 right-0 z-50 bg-white shadow p-2 text-center text-sm">
      <template v-if="loading">
        <span class="text-gray-600">加载站点设置中...</span>
      </template>
      <template v-else-if="error">
        <span class="text-red-600">{{ error }}</span>
        <button @click="loadSettings" class="ml-2 text-blue-600 hover:underline">重试</button>
      </template>
    </div>
    
    <!-- 内容插槽 -->
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, ref, provide } from 'vue';
import settingService from '../../services/settingService';

export default {
  name: 'SettingsProvider',
  
  setup() {
    // 状态
    const settings = ref({});
    const loading = ref(false);
    const error = ref(null);
    
    // 加载设置
    const loadSettings = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        const response = await settingService.getPublicSettings();
        console.log('设置加载响应:', response);
        
        if (response && response.data && response.data.success) {
          settings.value = response.data.data;
          console.log('已加载设置:', settings.value);
        } else {
          console.error('设置响应格式不正确:', response);
          throw new Error('设置响应格式不正确');
        }
      } catch (err) {
        console.error('加载设置失败:', err);
        error.value = '无法加载站点设置，请稍后再试';
      } finally {
        loading.value = false;
      }
    };
    
    // 页面加载时加载设置并订阅更新事件
    onMounted(() => {
      loadSettings();
      const evtSource = new EventSource('/api/events');
      evtSource.addEventListener('settingsUpdated', () => {
        loadSettings();
      });
    });
    
    // 向下级组件提供设置数据
    provide('settings', settings);
    provide('settingsLoading', loading);
    provide('settingsError', error);
    provide('reloadSettings', loadSettings);
    
    return {
      settings,
      loading,
      error,
      loadSettings
    };
  }
};
</script>

<style scoped>
/* 需要的样式可以在这里添加 */
</style>
