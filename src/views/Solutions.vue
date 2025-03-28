<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="bg-gradient-to-r from-secondary-600 to-secondary-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="lg:w-1/2">
            <h1 class="text-3xl font-extrabold text-white sm:text-4xl">
              行业解决方案
            </h1>
            <p class="mt-3 max-w-md text-lg text-secondary-100">
              针对不同行业的数字化需求，我们提供全面而专业的解决方案
            </p>
          </div>
          <div class="mt-8 lg:mt-0 lg:w-1/2">
            <div class="flex justify-end">
              <div class="inline-flex rounded-md shadow">
                <router-link to="/contact" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-secondary-600 bg-white hover:bg-secondary-50 transition-colors duration-300">
                  咨询专家
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Solutions List -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 加载中提示 -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">加载解决方案...</p>
        </div>
        
        <!-- 错误提示 -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-500">{{ error }}</p>
          <button @click="fetchSolutions" class="mt-4 px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700">
            重试
          </button>
        </div>
        
        <!-- 无数据提示 -->
        <div v-else-if="solutions.length === 0" class="text-center py-12">
          <p class="text-gray-600">暂无解决方案数据</p>
        </div>
        
        <!-- 动态解决方案列表 -->
        <div v-else>
          <div v-for="(solution, index) in solutions" :key="solution.id" class="mb-20">
            <div class="lg:flex lg:items-center lg:justify-between" :class="{ 'flex-row-reverse': index % 2 !== 0 }">
              <div class="lg:w-1/2 mb-8 lg:mb-0" :class="{ 'lg:pl-10': index % 2 !== 0 }">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ solution.name }}</h2>
                <p class="text-gray-600 mb-6">
                  {{ solution.description }}
                </p>
                <div class="mt-6">
                  <router-link :to="'/solutions/' + solution.slug" class="text-secondary-600 hover:text-secondary-800 font-medium">了解详情 →</router-link>
                </div>
              </div>
              <div class="lg:w-1/2 bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                <div v-if="solution.image" class="w-full h-64 rounded-lg overflow-hidden">
                  <img :src="solution.image" :alt="solution.name" class="w-full h-full object-cover">
                </div>
                <div v-else class="w-full h-64 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 text-lg">
                  {{ solution.name }}解决方案示意图
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-10 md:p-16">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold text-white">
              定制您的行业解决方案
            </h2>
            <p class="mt-4 text-xl text-white opacity-90">
              我们的专家团队将根据您的需求，为您量身定制最佳解决方案
            </p>
            <div class="mt-8">
              <router-link to="/contact" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors duration-300">
                立即咨询
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SolutionsView',
  data() {
    return {
      solutions: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchSolutions();
  },
  methods: {
    async fetchSolutions() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get('/api/solutions');
        this.solutions = response.data.data || [];
      } catch (err) {
        console.error('获取解决方案失败:', err);
        this.error = '获取解决方案数据失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
