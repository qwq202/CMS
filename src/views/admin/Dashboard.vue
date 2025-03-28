<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">仪表盘</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-primary-100 mr-4">
            <svg class="h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">产品总数</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.products }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-secondary-100 mr-4">
            <svg class="h-8 w-8 text-secondary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">解决方案总数</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.solutions }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-amber-100 mr-4">
            <svg class="h-8 w-8 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600">联系咨询总数</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.contacts }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">最近联系咨询</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">公司</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="contact in recentContacts" :key="contact.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ contact.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contact.company }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                  :class="{
                    'bg-green-100 text-green-800': contact.status === 'replied',
                    'bg-yellow-100 text-yellow-800': contact.status === 'pending',
                    'bg-gray-100 text-gray-800': contact.status === 'archived'
                  }">
                  {{ contact.statusText }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(contact.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { productApi, solutionApi, contactApi } from '../../api';

export default {
  name: 'Dashboard',
  setup() {
    const stats = ref({
      products: 0,
      solutions: 0,
      contacts: 0
    });
    
    const recentContacts = ref([]);
    
    // 获取统计数据
    const fetchStats = async () => {
      try {
        const [productsResponse, solutionsResponse, contactsResponse] = await Promise.all([
          productApi.getProducts(),
          solutionApi.getSolutions(),
          contactApi.getContacts()
        ]);
        
        if (productsResponse.data && productsResponse.data.success) {
          stats.value.products = productsResponse.data.data.length;
        }
        
        if (solutionsResponse.data && solutionsResponse.data.success) {
          stats.value.solutions = solutionsResponse.data.data.length;
        }
        
        if (contactsResponse.data && contactsResponse.data.success) {
          stats.value.contacts = contactsResponse.data.total || contactsResponse.data.data.length;
          recentContacts.value = contactsResponse.data.data.slice(0, 5);
        }
      } catch (error) {
        console.error('获取统计数据失败', error);
      }
    };
    
    // 格式化日期
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    
    // 获取联系人状态文本
    const getStatusText = (status) => {
      switch (status) {
        case 'pending': return '待处理';
        case 'replied': return '已回复';
        case 'archived': return '已归档';
        default: return status;
      }
    };
    
    // 为联系人添加状态文本
    const processContacts = (contacts) => {
      return contacts.map(contact => ({
        ...contact,
        statusText: getStatusText(contact.status)
      }));
    };
    
    onMounted(() => {
      fetchStats();
    });
    
    return {
      stats,
      recentContacts,
      formatDate
    };
  }
};
</script>
