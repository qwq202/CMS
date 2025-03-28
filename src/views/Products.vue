<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="lg:w-1/2">
            <h1 class="text-3xl font-extrabold text-white sm:text-4xl">
              云智汇产品系列
            </h1>
            <p class="mt-3 max-w-md text-lg text-primary-100">
              我们的产品融合了最新技术，为企业提供全方位的智能云解决方案
            </p>
          </div>
          <div class="mt-8 lg:mt-0 lg:w-1/2">
            <div class="flex justify-end">
              <div class="inline-flex rounded-md shadow">
                <a href="/contact" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-300">
                  预约演示
                </a>
              </div>
              <div class="ml-3 inline-flex">
                <a href="#pricing" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-900 hover:bg-primary-800 transition-colors duration-300">
                  查看价格
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product List Section -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900">我们的产品系列</h2>
          <button @click="refreshProducts" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            刷新
          </button>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-10">
          <p class="text-gray-500">加载产品中...</p>
        </div>
        
        <!-- 无产品提示 -->
        <div v-else-if="products.length === 0" class="text-center py-10">
          <p class="text-gray-500">暂无产品数据</p>
        </div>
        
        <!-- 动态产品列表 -->
        <div v-else>
          <div v-for="(product, index) in products" :key="product.id" class="mb-16 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="md:flex">
              <div class="md:w-1/3 bg-gray-50 p-6 flex items-center justify-center">
                <div v-if="product.image" class="h-48 w-full rounded flex items-center justify-center">
                  <img :src="product.image" :alt="product.name" class="max-h-full max-w-full object-contain" />
                </div>
                <div v-else class="h-48 w-full bg-primary-100 rounded flex items-center justify-center">
                  <div class="text-primary-700 text-xl font-semibold">{{ product.name }}</div>
                </div>
              </div>
              <div class="md:w-2/3 p-6">
                <h3 class="text-xl font-bold text-primary-700 mb-2">{{ product.name }}</h3>
                <p class="text-gray-600 mb-4">{{ product.description }}</p>
                <div class="flex items-center">
                  <router-link :to="'/products/' + product.slug" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    了解详情
                    <svg class="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div id="pricing" class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">简单透明的价格</h2>
          <p class="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            按需选择，灵活扩展，满足不同规模企业需求
          </p>
        </div>
        <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          <!-- Standard Plan -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900">标准版</h3>
              <p class="mt-2 text-3xl font-bold text-gray-900">¥299<span class="text-base font-normal text-gray-500">/月</span></p>
              <p class="mt-4 text-sm text-gray-500">适合中小型企业</p>
            </div>
            <div class="px-6 pt-6 pb-8">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">所有基础功能</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">5个用户</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">500GB存储空间</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">社区支持</p>
                </li>
              </ul>
              <div class="mt-8">
                <a href="/contact" class="block w-full text-center px-4 py-2 border border-transparent text-white font-medium rounded-md bg-primary-600 hover:bg-primary-700 transition-colors duration-300">
                  开始试用
                </a>
              </div>
            </div>
          </div>

          <!-- Pro Plan -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg relative">
            <div class="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 text-sm font-medium">
              推荐
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900">专业版</h3>
              <p class="mt-2 text-3xl font-bold text-gray-900">¥699<span class="text-base font-normal text-gray-500">/月</span></p>
              <p class="mt-4 text-sm text-gray-500">适合大型企业</p>
            </div>
            <div class="px-6 pt-6 pb-8">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">所有标准版功能</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">20个用户</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">2TB存储空间</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">优先技术支持</p>
                </li>
              </ul>
              <div class="mt-8">
                <a href="/contact" class="block w-full text-center px-4 py-2 border border-transparent text-white font-medium rounded-md bg-primary-600 hover:bg-primary-700 transition-colors duration-300">
                  开始试用
                </a>
              </div>
            </div>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900">企业版</h3>
              <p class="mt-2 text-3xl font-bold text-gray-900">联系我们<span class="text-base font-normal text-gray-500"></span></p>
              <p class="mt-4 text-sm text-gray-500">适合大型企业的定制化解决方案</p>
            </div>
            <div class="px-6 pt-6 pb-8">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">所有专业版功能</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">无限用户</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">定制存储方案</p>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="ml-3 text-base text-gray-700">24/7专属支持</p>
                </li>
              </ul>
              <div class="mt-8">
                <a href="/contact" class="block w-full text-center px-4 py-2 border border-primary-600 text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors duration-300">
                  联系销售团队
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { productApi } from '../api';

export default {
  setup() {
    const products = ref([]);
    const loading = ref(true);
    
    // 获取产品列表
    const fetchProducts = async () => {
      loading.value = true;
      try {
        // 添加时间戳避免缓存问题
        const timestamp = new Date().getTime();
        const response = await productApi.getProducts();
        
        if (response.data && response.data.success) {
          products.value = response.data.data || [];
        } else {
          console.error('获取产品列表失败:', response.data.message);
        }
      } catch (error) {
        console.error('获取产品列表失败:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // 强制刷新产品列表
    const refreshProducts = async () => {
      await fetchProducts();
    };
    
    onMounted(() => {
      fetchProducts();
    });
    
    return {
      products,
      loading,
      refreshProducts
    };
  }
}
</script>
