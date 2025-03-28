<template>
  <div class="bg-white">
    <!-- 加载中状态 -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-accent-600 to-accent-700 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {{ contactData.hero.title || '联系我们' }}
            </h1>
            <p class="mt-6 max-w-xl mx-auto text-xl text-accent-100">
              {{ contactData.hero.subtitle || '我们期待听到您的声音' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Contact Info Section -->
      <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Contact Card 1 -->
            <div class="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-accent-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900 text-center">{{ contactData.info.phone.title || '电话咨询' }}</h3>
              <p class="mt-2 text-base text-gray-500 text-center">
                {{ contactData.info.phone.description || '工作时间：周一至周五 9:00-18:00' }}
              </p>
              <p class="mt-2 text-lg font-semibold text-accent-600 text-center">
                {{ contactData.info.phone.value || '010-88888888' }}
              </p>
            </div>

            <!-- Contact Card 2 -->
            <div class="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-accent-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900 text-center">{{ contactData.info.email.title || '电子邮件' }}</h3>
              <p class="mt-2 text-base text-gray-500 text-center">
                {{ contactData.info.email.description || '7*24小时接收您的咨询' }}
              </p>
              <p class="mt-2 text-lg font-semibold text-accent-600 text-center">
                {{ contactData.info.email.value || 'contact@yunzhihui.com' }}
              </p>
            </div>

            <!-- Contact Card 3 -->
            <div class="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-accent-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900 text-center">{{ contactData.info.address.title || '公司地址' }}</h3>
              <p class="mt-2 text-base text-gray-500 text-center">
                {{ contactData.info.address.description || '欢迎前来参观' }}
              </p>
              <p class="mt-2 text-lg font-semibold text-accent-600 text-center">
                {{ contactData.info.address.value || '北京市海淀区科技园区88号' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-12">
            <!-- Form Section -->
            <div>
              <h2 class="text-2xl font-extrabold text-gray-900">
                留言咨询
              </h2>
              <p class="mt-4 text-lg text-gray-500">
                填写下面的表单，我们会尽快与您联系
              </p>
              <div class="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                <div class="p-6">
                  <h2 class="text-2xl font-bold text-gray-900 mb-4">联系我们</h2>
                  <p class="text-gray-600 mb-6">如果您对我们的产品或解决方案有任何疑问，请填写以下表单，我们的专业团队将尽快与您联系。</p>
                  
                  <div v-if="submitSuccess" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                    <p class="font-medium">提交成功！</p>
                    <p>感谢您的咨询，我们将尽快与您联系。</p>
                  </div>
                  
                  <div v-if="submitError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    <p class="font-medium">提交失败</p>
                    <p>{{ submitError }}</p>
                  </div>
                  
                  <form @submit.prevent="submitForm" v-if="!submitSuccess">
                    <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">姓名 <span class="text-red-500">*</span></label>
                        <div class="mt-1">
                          <input 
                            type="text" 
                            id="name" 
                            v-model="formData.name" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            :class="{'border-red-300': errors.name}"
                          >
                          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                        </div>
                      </div>
                      <div>
                        <label for="company" class="block text-sm font-medium text-gray-700">公司名称</label>
                        <div class="mt-1">
                          <input 
                            type="text" 
                            id="company" 
                            v-model="formData.company" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          >
                        </div>
                      </div>
                      <div>
                        <label for="position" class="block text-sm font-medium text-gray-700">职位</label>
                        <div class="mt-1">
                          <input 
                            type="text" 
                            id="position" 
                            v-model="formData.position" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          >
                        </div>
                      </div>
                      <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">邮箱 <span class="text-red-500">*</span></label>
                        <div class="mt-1">
                          <input 
                            type="email" 
                            id="email" 
                            v-model="formData.email" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            :class="{'border-red-300': errors.email}"
                          >
                          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                        </div>
                      </div>
                      <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">电话</label>
                        <div class="mt-1">
                          <input 
                            type="tel" 
                            id="phone" 
                            v-model="formData.phone" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          >
                        </div>
                      </div>
                      <div>
                        <label for="interested_in" class="block text-sm font-medium text-gray-700">感兴趣的产品/解决方案</label>
                        <div class="mt-1">
                          <select 
                            id="interested_in" 
                            v-model="formData.interested_in" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          >
                            <option value="">请选择</option>
                            <option v-for="(product, index) in contactData.form?.productOptions || []" 
                              :key="index" 
                              :value="product.value"
                            >
                              {{ product.label }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="sm:col-span-2">
                        <label for="message" class="block text-sm font-medium text-gray-700">咨询内容 <span class="text-red-500">*</span></label>
                        <div class="mt-1">
                          <textarea 
                            id="message" 
                            rows="4" 
                            v-model="formData.message" 
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            :class="{'border-red-300': errors.message}"
                          ></textarea>
                          <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
                        </div>
                      </div>
                      <div class="sm:col-span-2">
                        <button 
                          type="submit" 
                          class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          :disabled="isSubmitting"
                        >
                          <span v-if="isSubmitting">提交中...</span>
                          <span v-else>提交咨询</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            <!-- Information Section -->
            <div class="mt-12 lg:mt-0">
              <div class="bg-white rounded-lg shadow overflow-hidden">
                <!-- Map Image Placeholder -->
                <div class="h-64 bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-500 text-lg">公司地图位置</span>
                </div>
                
                <div class="p-6">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">公司办公时间</h3>
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p class="text-sm font-medium text-gray-900">周一至周五</p>
                      <p class="text-sm text-gray-500">9:00 - 18:00</p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">周六</p>
                      <p class="text-sm text-gray-500">10:00 - 16:00</p>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">周日</p>
                      <p class="text-sm text-gray-500">休息</p>
                    </div>
                  </div>
                  
                  <h3 class="text-lg font-medium text-gray-900 mb-4">售后服务</h3>
                  <p class="text-sm text-gray-600 mb-2">
                    7*24小时技术支持热线: <span class="text-accent-600 font-medium">400-888-8888</span>
                  </p>
                  <p class="text-sm text-gray-600">
                    售后服务邮箱: <span class="text-accent-600 font-medium">support@yunzhihui.com</span>
                  </p>
                </div>
              </div>
              
              <div class="mt-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4">常见问题</h3>
                <dl class="space-y-4">
                  <div>
                    <dt class="text-base font-medium text-gray-900">如何申请产品演示？</dt>
                    <dd class="mt-1 text-sm text-gray-500">
                      您可以通过联系表单或直接发送邮件申请产品演示，我们的销售团队会在1个工作日内与您联系。
                    </dd>
                  </div>
                  <div>
                    <dt class="text-base font-medium text-gray-900">是否提供定制开发服务？</dt>
                    <dd class="mt-1 text-sm text-gray-500">
                      是的，我们为企业级客户提供定制开发服务，以满足特定的业务需求。
                    </dd>
                  </div>
                  <div>
                    <dt class="text-base font-medium text-gray-900">如何获取产品价格？</dt>
                    <dd class="mt-1 text-sm text-gray-500">
                      您可以在产品页面查看标准定价，或联系我们的销售团队获取详细报价。
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { settingService, contactApi } from '../api'; // 同时导入settingService和contactApi

export default {
  setup() {
    // 表单数据
    const formData = ref({
      name: '',
      company: '',
      position: '',
      email: '',
      phone: '',
      message: '',
      interested_in: '',
      source: '官网联系页面'
    });

    // 表单状态
    const isSubmitting = ref(false);
    const submitSuccess = ref(false);
    const submitError = ref(null);

    // 表单验证
    const errors = ref({});

    // 加载状态
    const loading = ref(true);
    const contactData = ref({
      hero: {
        title: '联系我们',
        subtitle: '我们期待听到您的声音'
      },
      info: {
        phone: {
          title: '电话咨询',
          description: '工作时间：周一至周五 9:00-18:00',
          value: '010-88888888'
        },
        email: {
          title: '电子邮件',
          description: '7*24小时接收您的咨询',
          value: 'contact@yunzhihui.com'
        },
        address: {
          title: '公司地址',
          description: '欢迎前来参观',
          value: '北京市海淀区科技园区88号'
        }
      },
      form: {
        productOptions: [
          { label: '云数据平台', value: '云数据平台' },
          { label: '智能协作系统', value: '智能协作系统' },
          { label: '智能安全中心', value: '智能安全中心' },
          { label: '金融行业解决方案', value: '金融行业解决方案' },
          { label: '医疗健康解决方案', value: '医疗健康解决方案' },
          { label: '零售行业解决方案', value: '零售行业解决方案' },
          { label: '其他', value: '其他' }
        ]
      }
    });

    // 加载联系页面数据
    const loadContactData = async () => {
      try {
        // 防止缓存，添加时间戳
        const timestamp = new Date().getTime();
        const response = await settingService.getAllSettings(`?public=true&t=${timestamp}`);
        
        // 处理设置数据
        if (response.data && response.data.success) {
          const settings = response.data.data;
          
          // 处理联系页面设置
          if (settings.contact) {
            const contactSettings = settings.contact;
            contactSettings.forEach(setting => {
              if (setting.key === 'contact_hero') {
                try {
                  const heroData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  contactData.value.hero = {
                    title: heroData.title || '联系我们',
                    subtitle: heroData.subtitle || '我们期待听到您的声音'
                  };
                } catch (e) {
                  console.error('解析联系页面英雄区数据失败:', e);
                }
              } else if (setting.key === 'contact_info') {
                try {
                  const infoData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  // 确保每个字段都存在并正确赋值
                  if (infoData) {
                    if (infoData.phone) {
                      contactData.value.info.phone = {
                        title: infoData.phone.title || '电话咨询',
                        description: infoData.phone.description || '工作时间：周一至周五 9:00-18:00',
                        value: infoData.phone.value || '010-88888888'
                      };
                    }
                    
                    if (infoData.email) {
                      contactData.value.info.email = {
                        title: infoData.email.title || '电子邮件',
                        description: infoData.email.description || '7*24小时接收您的咨询',
                        value: infoData.email.value || 'contact@yunzhihui.com'
                      };
                    }
                    
                    if (infoData.address) {
                      contactData.value.info.address = {
                        title: infoData.address.title || '公司地址',
                        description: infoData.address.description || '欢迎前来参观',
                        value: infoData.address.value || '北京市海淀区科技园区88号'
                      };
                    }
                  }
                } catch (e) {
                  console.error('解析联系页面联系信息失败:', e);
                }
              } else if (setting.key === 'contact_form_products') {
                try {
                  const productOptions = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  if (Array.isArray(productOptions)) {
                    contactData.value.form.productOptions = productOptions;
                  }
                } catch (e) {
                  console.error('解析联系页面产品选项失败:', e);
                }
              }
            });
          }
        }
      } catch (error) {
        console.error('加载联系页面数据失败:', error);
      } finally {
        loading.value = false;
      }
    };

    // 加载联系页面数据
    loadContactData();

    // 验证表单
    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.value.name.trim()) {
        newErrors.name = '姓名不能为空';
      }
      
      if (!formData.value.email.trim()) {
        newErrors.email = '邮箱不能为空';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        newErrors.email = '请输入有效的邮箱地址';
      }
      
      if (!formData.value.message.trim()) {
        newErrors.message = '咨询内容不能为空';
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };

    // 提交表单
    const submitForm = async () => {
      if (!validateForm()) {
        return;
      }
      
      isSubmitting.value = true;
      submitError.value = null;
      
      try {
        const response = await contactApi.submitContact(formData.value);
        submitSuccess.value = true;
        // 重置表单
        formData.value = {
          name: '',
          company: '',
          position: '',
          email: '',
          phone: '',
          message: '',
          interested_in: '',
          source: '官网联系页面'
        };
      } catch (error) {
        console.error('提交表单错误:', error);
        submitError.value = error.response?.data?.message || '提交失败，请稍后再试';
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      isSubmitting,
      submitSuccess,
      submitError,
      errors,
      submitForm,
      loading,
      contactData
    };
  }
}
</script>
