<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">站点设置</h1>
        
        <!-- 刷新按钮 -->
        <button 
          @click="forceRefreshSettings" 
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ loading ? '加载中...' : '刷新设置' }}
        </button>
      </div>
      
      <!-- 加载中 -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- 错误提示 -->
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>
      
      <!-- 通知 -->
      <div v-if="notification.show" class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6" :class="{
        'bg-green-50 border-l-4 border-green-400': notification.type === 'success',
        'bg-red-50 border-l-4 border-red-400': notification.type === 'error',
        'bg-yellow-50 border-l-4 border-yellow-400': notification.type === 'info'
      }">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg v-if="notification.type === 'success'" class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm4 0h-2v2h2V9zm4 0h-2v2h2V9zM9 5v2h6V5H9z" clip-rule="evenodd" />
            </svg>
            <svg v-else-if="notification.type === 'error'" class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-gray-700">{{ notification.message }}</p>
          </div>
        </div>
      </div>
      
      <!-- 设置内容 -->
      <div v-else>
        <!-- 分组标签页 -->
        <div class="border-b border-gray-200 mb-6">
          <nav class="flex -mb-px space-x-8 overflow-x-auto">
            <button 
              v-for="group in Object.keys(settings)" 
              :key="group"
              @click="currentGroup = group"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              :class="[
                currentGroup === group
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ getGroupLabel(group) }}
            </button>
          </nav>
        </div>
        
        <!-- 设置表单 -->
        <div v-if="currentGroup && settings[currentGroup]">
          <form @submit.prevent="saveSettings">
            <div class="space-y-6">
              <!-- 设置项 -->
              <div v-for="setting in settings[currentGroup]" :key="setting.key" class="border-b border-gray-200 pb-6">
                <div class="flex flex-col">
                  <label :for="setting.key" class="block text-sm font-medium text-gray-700 mb-1">
                    {{ setting.label }}
                  </label>
                  <p v-if="setting.description" class="text-sm text-gray-500 mb-3">{{ setting.description }}</p>
                  
                  <!-- 文本输入 -->
                  <input 
                    v-if="setting.type === 'text'" 
                    type="text" 
                    :id="setting.key" 
                    v-model="formData[setting.key]" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  
                  <!-- 文本区域 -->
                  <textarea 
                    v-else-if="setting.type === 'textarea'" 
                    :id="setting.key" 
                    v-model="formData[setting.key]" 
                    rows="4" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                  
                  <!-- 数字输入 -->
                  <input 
                    v-else-if="setting.type === 'number'" 
                    type="number" 
                    :id="setting.key" 
                    v-model.number="formData[setting.key]" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  
                  <!-- 布尔值开关 -->
                  <div v-else-if="setting.type === 'boolean'" class="mt-2">
                    <label class="inline-flex items-center">
                      <input type="checkbox" v-model="formData[setting.key]" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span class="ml-2 text-sm text-gray-600">启用</span>
                    </label>
                  </div>
                  
                  <!-- 图片上传 -->
                  <div v-else-if="setting.type === 'image'" class="mt-2">
                    <div v-if="formData[setting.key]" class="mb-3">
                      <img :src="formData[setting.key]" class="max-h-32 object-contain" />
                    </div>
                    <label class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <input type="file" @change="e => handleImageUpload(e, setting.key)" class="sr-only" accept="image/*" />
                      <span>上传图片</span>
                    </label>
                  </div>
                  
                  <!-- JSON编辑器 -->
                  <div v-else-if="setting.type === 'json' && isComplexJsonSetting(setting.key)">
                    <div class="mb-2 flex items-start justify-between">
                      <div>
                        <label :for="setting.key" class="block text-sm font-medium text-gray-700">{{ setting.label }}</label>
                        <p v-if="setting.description" class="mt-1 text-sm text-gray-500">{{ setting.description }}</p>
                      </div>
                      <div class="ml-4">
                        <span 
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {{ getSettingTypeText(setting.type) }}
                        </span>
                      </div>
                    </div>
                    
                    <JsonSettingEditor 
                      :value="getJsonValue(setting.key)" 
                      :label="setting.label"
                      :description="setting.description"
                      :setting-type="getJsonSettingType(setting.key)"
                      @update:value="updateJsonValue(setting.key, $event)"
                    />
                  </div>
                  <div v-else-if="setting.type === 'json'">
                    <textarea 
                      :id="setting.key" 
                      v-model="jsonSettings[setting.key]" 
                      rows="8" 
                      class="font-mono text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      :class="{ 'border-red-500': jsonErrors[setting.key] }"
                    ></textarea>
                    <p v-if="jsonErrors[setting.key]" class="mt-1 text-sm text-red-600">{{ jsonErrors[setting.key] }}</p>
                  </div>
                  
                  <!-- 选择输入 -->
                  <select 
                    v-else-if="setting.type === 'select'" 
                    :id="setting.key" 
                    v-model="formData[setting.key]" 
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option v-for="(label, value) in setting.options" :key="value" :value="value">{{ label }}</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="mt-8 flex justify-end">
              <button
                type="button"
                @click="resetForm"
                class="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="saving"
              >
                重置
              </button>
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="saving"
              >
                <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ saving ? '保存中...' : '保存设置' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { settingService } from '../../api';
import JsonSettingEditor from '../../components/admin/JsonSettingEditor.vue'; // 引入JsonSettingEditor组件

export default {
  components: { JsonSettingEditor }, // 注册JsonSettingEditor组件
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const saving = ref(false);
    const error = ref(null);
    const formData = reactive({});
    const jsonSettings = reactive({});
    const jsonErrors = reactive({});
    const currentGroup = ref('');
    const settings = ref({});
    const notification = ref({ show: false, message: '', type: 'success' });
    
    // 显示通知
    const showNotification = (message, type = 'success') => {
      notification.value = {
        show: true,
        message,
        type
      };
      
      // 3秒后自动关闭
      setTimeout(() => {
        notification.value.show = false;
      }, 3000);
    };
    
    // 加载设置
    const loadSettings = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        // 添加时间戳避免缓存问题
        const timestamp = new Date().getTime();
        const response = await settingService.getAllSettings(`?t=${timestamp}`);
        console.log('设置返回数据:', response.data);
        
        if (response.data && response.data.success) {
          // 检查响应数据结构
          const settingsData = response.data.data;
          
          if (Array.isArray(settingsData)) {
            // 如果是数组，按分组组织设置
            const groupedSettings = {};
            
            settingsData.forEach(setting => {
              if (!groupedSettings[setting.group]) {
                groupedSettings[setting.group] = [];
              }
              groupedSettings[setting.group].push(setting);
            });
            
            settings.value = groupedSettings;
          } else {
            // 如果已经是按分组组织的对象，直接使用
            settings.value = settingsData;
          }
          
          // 获取设置后，如果没有当前分组，设置第一个分组为当前分组
          if (!currentGroup.value && Object.keys(settings.value).length > 0) {
            currentGroup.value = Object.keys(settings.value)[0];
          }
          
          // 初始化表单数据
          initFormData();
          
          // 设置加载成功通知
          showNotification('设置已成功加载', 'success');
        } else {
          throw new Error(response.data.message || '获取设置失败');
        }
      } catch (err) {
        console.error('加载设置失败:', err);
        error.value = err.message || '加载设置时发生错误';
        showNotification(`加载设置失败: ${error.value}`, 'error');
      } finally {
        loading.value = false;
      }
    };
    
    // 强制刷新设置
    const forceRefreshSettings = async () => {
      await loadSettings();
    };
    
    // 初始化表单数据
    const initFormData = () => {
      // 清空现有数据
      Object.keys(formData).forEach(key => delete formData[key]);
      Object.keys(jsonSettings).forEach(key => delete jsonSettings[key]);
      Object.keys(jsonErrors).forEach(key => delete jsonErrors[key]);
      
      // 将所有设置填充到表单
      Object.keys(settings.value).forEach(group => {
        settings.value[group].forEach(setting => {
          if (setting.type === 'json') {
            // JSON设置需要特殊处理 - 转换为字符串显示
            jsonSettings[setting.key] = JSON.stringify(setting.value, null, 2);
          } else {
            // 其他类型直接使用值
            formData[setting.key] = setting.value;
          }
        });
      });
    };
    
    // 重置表单
    const resetForm = () => {
      initFormData();
      showNotification('表单已重置', 'info');
    };
    
    // 验证JSON
    const validateJson = () => {
      let isValid = true;
      
      // 清空错误
      Object.keys(jsonErrors).forEach(key => delete jsonErrors[key]);
      
      // 检查每个JSON设置
      Object.keys(jsonSettings).forEach(key => {
        try {
          JSON.parse(jsonSettings[key]);
        } catch (e) {
          jsonErrors[key] = '无效的JSON格式';
          isValid = false;
        }
      });
      
      return isValid;
    };
    
    // 处理图片上传
    const handleImageUpload = (event, key) => {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        formData[key] = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    
    // 保存设置
    const saveSettings = async () => {
      // 验证JSON
      if (!validateJson()) {
        showNotification('JSON格式错误，请检查', 'error');
        return;
      }
      
      saving.value = true;
      
      try {
        // 准备要更新的设置列表
        const settingsToUpdate = [];
        
        // 遍历所有设置
        Object.keys(settings.value).forEach(group => {
          settings.value[group].forEach(setting => {
            let value;
            
            if (setting.type === 'json') {
              // JSON设置从jsonSettings中获取
              value = JSON.parse(jsonSettings[setting.key]);
            } else {
              // 其他类型从formData中获取
              value = formData[setting.key];
            }
            
            // 只有值发生变化的设置才更新
            if (JSON.stringify(setting.value) !== JSON.stringify(value)) {
              settingsToUpdate.push({
                key: setting.key,
                value,
                type: setting.type,
                group: setting.group,
                label: setting.label,
                description: setting.description,
                isPublic: setting.isPublic
              });
            }
          });
        });
        
        if (settingsToUpdate.length > 0) {
          try {
            const response = await settingService.updateSettings(settingsToUpdate);
            
            if (response.data && response.data.success) {
              showNotification('设置保存成功', 'success');
              // 重新加载设置，确保显示最新数据
              await loadSettings();
            } else {
              throw new Error('保存设置失败');
            }
          } catch (error) {
            console.error('保存设置失败:', error);
            showNotification('保存设置失败:' + (error.message || '未知错误'), 'error');
          }
        } else {
          // 没有设置发生变化
          showNotification('没有需要保存的更改', 'info');
        }
      } finally {
        saving.value = false;
      }
    };
    
    // 获取分组的显示名称
    const getGroupLabel = (groupName) => {
      const groupLabels = {
        'general': '基本设置',
        'contact': '联系信息',
        'theme': '主题设置',
        'homepage': '首页设置',
        'seo': 'SEO设置',
        'social': '社交媒体',
        'system': '系统设置'
      };
      
      return groupLabels[groupName] || groupName;
    };
    
    // 判断是否是复杂JSON设置
    const isComplexJsonSetting = (key) => {
      // 关于我们页面和联系我们页面的相关设置
      const complexJsonKeys = [
        'about_hero', 'about_introduction', 'about_values',
        'about_history', 'about_team', 'contact_info',
        'contact_form_options'
      ];
      return complexJsonKeys.includes(key);
    };
    
    // 获取JSON设置的值
    const getJsonValue = (key) => {
      try {
        // 确保JSON设置有正确的默认值
        if (!jsonSettings[key]) {
          // 根据不同的设置键提供不同的默认值
          if (key === 'about_hero') {
            jsonSettings[key] = { title: '关于我们', subtitle: '了解云智汇的愿景与使命' };
          } else if (key === 'about_introduction') {
            jsonSettings[key] = { title: '公司简介', subtitle: '专注于智能云平台解决方案', content: '<p>这里是公司简介内容</p>' };
          } else if (key === 'about_values') {
            jsonSettings[key] = { title: '企业文化', subtitle: '我们的核心价值观', items: [] };
          } else if (key === 'about_history') {
            jsonSettings[key] = { title: '发展历程', subtitle: '我们的成长之路', milestones: [] };
          } else if (key === 'about_team') {
            jsonSettings[key] = { title: '团队成员', subtitle: '我们的专业团队', members: [] };
          } else if (key === 'contact_info') {
            jsonSettings[key] = {
              phone: { title: '电话咨询', description: '工作日 9:00-18:00', value: '400-123-4567' },
              email: { title: '邮件咨询', description: '7*24小时服务', value: 'contact@yunzhihui.com' },
              address: { title: '公司地址', description: '欢迎莅临参观', value: '北京市海淀区中关村科技园' }
            };
          } else if (key === 'contact_form_options') {
            jsonSettings[key] = [];
          } else {
            jsonSettings[key] = {};
          }
        }
        
        // 如果是字符串，尝试解析为JSON对象
        if (typeof jsonSettings[key] === 'string') {
          return JSON.parse(jsonSettings[key]);
        }
        return jsonSettings[key];
      } catch (e) {
        console.error(`解析JSON设置 ${key} 失败:`, e);
        return {};
      }
    };
    
    // 更新JSON设置的值
    const updateJsonValue = (key, value) => {
      try {
        // 如果值是对象或数组，转换为JSON字符串
        if (typeof value === 'object') {
          jsonSettings[key] = value;
        } else {
          jsonSettings[key] = value;
        }
      } catch (e) {
        console.error(`更新JSON设置 ${key} 失败:`, e);
      }
    };
    
    // 获取JSON设置类型
    const getJsonSettingType = (key) => {
      // 根据设置的key返回对应的编辑器类型
      const settingTypes = {
        'about_hero': 'hero',
        'about_introduction': 'introduction',
        'about_values': 'values',
        'about_history': 'history',
        'about_team': 'team',
        'contact_info': 'contactInfo',
        'contact_form_options': 'productOptions'
      };
      
      return settingTypes[key] || 'json';
    };
    
    // 获取设置类型文本
    const getSettingTypeText = (type) => {
      const typeTexts = {
        'text': '文本',
        'textarea': '文本区域',
        'number': '数字',
        'boolean': '布尔值',
        'image': '图片',
        'json': 'JSON',
        'select': '选择'
      };
      
      return typeTexts[type] || type;
    };
    
    // 生命周期
    onMounted(() => {
      loadSettings();
    });
    
    return {
      loading,
      saving,
      error,
      settings,
      formData,
      jsonSettings,
      jsonErrors,
      currentGroup,
      notification,
      loadSettings,
      forceRefreshSettings,
      resetForm,
      saveSettings,
      handleImageUpload,
      getGroupLabel,
      isComplexJsonSetting,
      getJsonValue,
      updateJsonValue,
      getJsonSettingType,
      getSettingTypeText
    };
  }
};
</script>
