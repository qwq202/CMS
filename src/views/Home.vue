<template>
  <div class="relative">
    <!-- 加载中状态 -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-primary-600 to-secondary-600">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              {{ homeData.hero.title || '智能云平台解决方案' }}
            </h1>
            <p class="mt-6 max-w-2xl mx-auto text-xl text-primary-100">
              {{ homeData.hero.subtitle || '为企业提供一体化云端服务，加速数字化转型' }}
            </p>
            <div class="mt-10">
              <a :href="homeData.hero.primaryButton.link || '#features'" 
                class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors duration-300">
                {{ homeData.hero.primaryButton.text || '了解更多' }}
              </a>
              <a :href="homeData.hero.secondaryButton.link || '/contact'" 
                class="ml-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-500 hover:bg-accent-600 transition-colors duration-300">
                {{ homeData.hero.secondaryButton.text || '立即咨询' }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="relative bg-white">
        <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="(stat, index) in homeData.stats" :key="index" class="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div class="px-4 py-5 sm:p-6 text-center">
                <div :class="`text-4xl font-extrabold text-${stat.color || 'primary'}-600`">{{ stat.value }}</div>
                <div class="mt-2 text-sm font-medium text-gray-500">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div id="features" class="py-16 bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <h2 class="text-base text-primary-600 font-semibold tracking-wide uppercase">{{ homeData.features.subtitle || '核心优势' }}</h2>
            <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {{ homeData.features.title || '为什么选择云智汇' }}
            </p>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {{ homeData.features.description || '我们提供全方位的智能云服务，助力企业数字化转型' }}
            </p>
          </div>

          <div class="mt-16">
            <div class="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
              <div v-for="(feature, index) in homeData.features.items" :key="index" class="relative">
                <div class="relative">
                  <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg v-if="feature.icon === 'chart'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <svg v-else-if="feature.icon === 'shield'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <svg v-else-if="feature.icon === 'lightning'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.title }}</p>
                </div>
                <div class="mt-2 ml-16 text-base text-gray-500">
                  {{ feature.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {{ homeData.products.title || '产品展示' }}
            </h2>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {{ homeData.products.description || '我们的产品线涵盖企业各类需求，提供全方位解决方案' }}
            </p>
          </div>

          <div class="mt-12 grid gap-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            <div v-for="(product, index) in products" :key="index" class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div :class="`h-12 w-12 rounded-md flex items-center justify-center bg-${product.color || 'primary'}-100 text-${product.color || 'primary'}-600`">
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="text-base text-gray-500">{{ product.description }}</p>
                </div>
                <div class="mt-6">
                  <router-link :to="`/products/${product.slug}`" class="inline-flex items-center text-primary-600 hover:text-primary-700">
                    了解更多
                    <svg class="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12 text-center">
            <router-link to="/products" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
              查看所有产品
            </router-link>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="bg-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {{ homeData.testimonials.title || '客户评价' }}
            </h2>
            <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              {{ homeData.testimonials.description || '来自各行业客户的真实反馈' }}
            </p>
          </div>

          <div class="mt-12 grid gap-8 lg:grid-cols-3">
            <div v-for="(testimonial, index) in homeData.testimonials.items" :key="index" class="bg-gray-50 overflow-hidden shadow rounded-lg p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img v-if="testimonial.avatar" :src="testimonial.avatar" class="h-12 w-12 rounded-full" :alt="testimonial.name">
                  <div v-else class="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-primary-600 font-medium text-lg">{{ testimonial.name ? testimonial.name.charAt(0) : 'U' }}</span>
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg font-medium text-gray-900">{{ testimonial.name }}</h4>
                  <p class="text-sm text-gray-500">{{ testimonial.title }}</p>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-gray-600 italic">{{ testimonial.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-primary-700">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span class="block">{{ homeData.cta.title || '准备好开始了吗？' }}</span>
            <span class="block text-primary-200">{{ homeData.cta.subtitle || '今天就联系我们，开启数字化转型之旅' }}</span>
          </h2>
          <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div class="inline-flex rounded-md shadow">
              <router-link to="/contact" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50">
                {{ homeData.cta.buttonText || '联系我们' }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { settingService, productApi } from '../api';

export default {
  setup() {
    const loading = ref(true);
    const products = ref([]);
    const homeData = reactive({
      hero: {
        title: '',
        subtitle: '',
        primaryButton: { text: '', link: '' },
        secondaryButton: { text: '', link: '' }
      },
      stats: [],
      features: {
        title: '',
        subtitle: '',
        description: '',
        items: []
      },
      products: {
        title: '',
        description: ''
      },
      testimonials: {
        title: '',
        description: '',
        items: []
      },
      cta: {
        title: '',
        subtitle: '',
        buttonText: ''
      }
    });

    // 加载所有首页需要的数据
    const loadHomeData = async () => {
      loading.value = true;
      try {
        // 防止缓存，添加时间戳
        const timestamp = new Date().getTime();
        const [settingsResponse, productsResponse] = await Promise.all([
          // 获取设置数据
          settingService.getAllSettings(`?public=true&t=${timestamp}`),
          // 获取产品数据
          productApi.getProducts(`?t=${timestamp}`)
        ]);

        // 处理设置数据
        if (settingsResponse.data && settingsResponse.data.success) {
          const settings = settingsResponse.data.data;
          
          // 处理首页英雄区域设置
          if (settings.homepage) {
            const homepageSettings = settings.homepage;
            homepageSettings.forEach(setting => {
              if (setting.key === 'homepage_hero') {
                try {
                  const heroData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  homeData.hero = {
                    title: heroData.title || '智能云平台解决方案',
                    subtitle: heroData.subtitle || '为企业提供一体化云端服务，加速数字化转型',
                    primaryButton: heroData.primaryButton || { text: '了解更多', link: '#features' },
                    secondaryButton: heroData.secondaryButton || { text: '立即咨询', link: '/contact' }
                  };
                } catch (e) {
                  console.error('解析首页英雄区数据失败:', e);
                }
              } else if (setting.key === 'homepage_stats') {
                try {
                  homeData.stats = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  if (!Array.isArray(homeData.stats)) {
                    homeData.stats = [];
                  }
                } catch (e) {
                  console.error('解析首页统计数据失败:', e);
                  homeData.stats = [];
                }
              } else if (setting.key === 'homepage_features') {
                try {
                  const featuresData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  homeData.features = {
                    title: featuresData.title || '为什么选择云智汇',
                    subtitle: featuresData.subtitle || '核心优势',
                    description: featuresData.description || '我们提供全方位的智能云服务，助力企业数字化转型',
                    items: featuresData.items || []
                  };
                } catch (e) {
                  console.error('解析首页特性数据失败:', e);
                }
              } else if (setting.key === 'homepage_products_section') {
                try {
                  const productsData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  homeData.products = {
                    title: productsData.title || '产品展示',
                    description: productsData.description || '我们的产品线涵盖企业各类需求，提供全方位解决方案'
                  };
                } catch (e) {
                  console.error('解析首页产品区数据失败:', e);
                }
              } else if (setting.key === 'homepage_testimonials') {
                try {
                  const testimonialsData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  homeData.testimonials = {
                    title: testimonialsData.title || '客户评价',
                    description: testimonialsData.description || '来自各行业客户的真实反馈',
                    items: testimonialsData.items || []
                  };
                } catch (e) {
                  console.error('解析首页客户评价数据失败:', e);
                }
              } else if (setting.key === 'homepage_cta') {
                try {
                  const ctaData = typeof setting.value === 'string' ? JSON.parse(setting.value) : setting.value;
                  homeData.cta = {
                    title: ctaData.title || '准备好开始了吗？',
                    subtitle: ctaData.subtitle || '今天就联系我们，开启数字化转型之旅',
                    buttonText: ctaData.buttonText || '联系我们'
                  };
                } catch (e) {
                  console.error('解析首页CTA数据失败:', e);
                }
              }
            });
          }
          
          // 如果没有首页数据，设置默认数据
          if (homeData.stats.length === 0) {
            homeData.stats = [
              { value: '500+', label: '企业用户', color: 'primary' },
              { value: '10PB+', label: '数据处理量', color: 'secondary' },
              { value: '99.9%', label: '服务可用性', color: 'accent' },
              { value: '24/7', label: '技术支持', color: 'primary' }
            ];
          }
          
          if (homeData.features.items.length === 0) {
            homeData.features.items = [
              { 
                title: '高可用性', 
                icon: 'chart',
                description: '99.9%的服务可用性，保障业务连续性，让您的企业不再担心系统中断' 
              },
              { 
                title: '全面加密', 
                icon: 'shield',
                description: '全链路数据加密保护，多重安全机制，为您的数据提供坚实防护' 
              },
              { 
                title: '快速部署', 
                icon: 'lightning',
                description: '简化的部署流程，几分钟内完成配置，快速上线业务系统' 
              }
            ];
          }
          
          if (homeData.testimonials.items.length === 0) {
            homeData.testimonials.items = [
              {
                name: '张经理',
                title: '某金融科技公司 CTO',
                content: '云智汇的数据平台帮助我们解决了大规模数据处理的难题，系统性能提升了300%，同时大幅降低了运维成本。'
              },
              {
                name: '李总监',
                title: '某电商平台 技术总监',
                content: '从传统架构迁移到云智汇平台后，我们的系统弹性扩展能力显著提高，轻松应对了双11流量高峰。'
              },
              {
                name: '王董事',
                title: '某医疗机构 信息总监',
                content: '云智汇的数据安全解决方案符合行业监管要求，帮助我们建立了全面的数据保护体系，值得信赖。'
              }
            ];
          }
        }

        // 处理产品数据
        if (productsResponse.data && productsResponse.data.success) {
          products.value = productsResponse.data.data || [];
        }

      } catch (error) {
        console.error('加载主页数据失败:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      loadHomeData();
    });

    return {
      loading,
      homeData,
      products
    };
  }
};
</script>
