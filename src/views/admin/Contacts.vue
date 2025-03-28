<template>
  <div class="admin-layout">
    <!-- 页面内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-semibold text-gray-900">联系咨询管理</h1>
            
            <!-- 过滤器 -->
            <div class="flex items-center space-x-4">
              <select 
                v-model="filter.status"
                @change="fetchContacts(1)"
                class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">全部状态</option>
                <option value="pending">待处理</option>
                <option value="contacted">已联系</option>
                <option value="closed">已关闭</option>
              </select>
            </div>
          </div>

          <!-- 联系信息列表 -->
          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-500">加载中...</p>
          </div>
          
          <div v-else-if="contacts.length === 0" class="text-center py-8">
            <p class="text-gray-500">暂无联系咨询数据</p>
          </div>
          
          <div v-else>
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">姓名</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">公司</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">邮箱</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">感兴趣的产品</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">提交时间</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">状态</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="contact in contacts" :key="contact.id" class="hover:bg-gray-50">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ contact.name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ contact.company || '-' }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ contact.email }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ contact.interested_in || '-' }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(contact.createdAt) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <span :class="{
                        'px-2 py-1 text-xs font-medium rounded-full': true,
                        'bg-yellow-100 text-yellow-800': contact.status === 'pending',
                        'bg-blue-100 text-blue-800': contact.status === 'contacted',
                        'bg-green-100 text-green-800': contact.status === 'closed'
                      }">
                        {{ formatStatus(contact.status) }}
                      </span>
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button @click="openContactDetail(contact)" class="text-primary-600 hover:text-primary-900">查看</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 分页 -->
            <div class="flex items-center justify-between px-4 py-3 sm:px-6 mt-4 bg-white">
              <div class="flex-1 flex justify-between sm:hidden">
                <button
                  @click="currentPage > 1 && fetchContacts(currentPage - 1)"
                  :disabled="currentPage <= 1"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white',
                    currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  ]"
                >
                  上一页
                </button>
                <button
                  @click="currentPage < totalPages && fetchContacts(currentPage + 1)"
                  :disabled="currentPage >= totalPages"
                  :class="[
                    'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white',
                    currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  ]"
                >
                  下一页
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到 <span class="font-medium">{{ Math.min(currentPage * pageSize, totalItems) }}</span> 条，共 <span class="font-medium">{{ totalItems }}</span> 条
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      @click="currentPage > 1 && fetchContacts(currentPage - 1)"
                      :disabled="currentPage <= 1"
                      :class="[
                        'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500',
                        currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                      ]"
                    >
                      <span class="sr-only">上一页</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    
                    <button
                      v-for="page in paginationRange"
                      :key="page"
                      @click="page !== '...' && fetchContacts(page)"
                      :class="[
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                        page === currentPage
                          ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                          : page === '...'
                            ? 'bg-white border-gray-300 text-gray-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      ]"
                    >
                      {{ page }}
                    </button>
                    
                    <button
                      @click="currentPage < totalPages && fetchContacts(currentPage + 1)"
                      :disabled="currentPage >= totalPages"
                      :class="[
                        'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500',
                        currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                      ]"
                    >
                      <span class="sr-only">下一页</span>
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 联系信息详情弹窗 -->
    <div v-if="showDetailModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">咨询详情</h3>
                <div class="mt-4">
                  <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">姓名</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ selectedContact?.name }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">公司</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ selectedContact?.company || '-' }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">职位</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ selectedContact?.position || '-' }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">邮箱</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ selectedContact?.email }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">电话</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ selectedContact?.phone || '-' }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">感兴趣的产品/解决方案</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ selectedContact?.interested_in || '-' }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label class="block text-sm font-medium text-gray-700">咨询内容</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900 whitespace-pre-line">{{ selectedContact?.message }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">来源</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ selectedContact?.source || '-' }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-3">
                      <label class="block text-sm font-medium text-gray-700">提交时间</label>
                      <div class="mt-1">
                        <p class="text-sm text-gray-900">{{ formatDateTime(selectedContact?.createdAt) }}</p>
                      </div>
                    </div>
                    <div class="sm:col-span-6">
                      <label class="block text-sm font-medium text-gray-700">状态</label>
                      <div class="mt-1">
                        <select 
                          v-model="currentStatus" 
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option value="pending">待处理</option>
                          <option value="contacted">已联系</option>
                          <option value="closed">已关闭</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="updateContactStatus" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
              更新状态
            </button>
            <button @click="closeContactDetail" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { contactApi } from '../../api';

export default {
  setup() {
    const contacts = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalItems = ref(0);
    const totalPages = ref(0);
    const showDetailModal = ref(false);
    const selectedContact = ref(null);
    const currentStatus = ref('');
    
    // 过滤条件
    const filter = ref({
      status: ''
    });
    
    // 获取联系咨询列表
    const fetchContacts = async (page = 1) => {
      loading.value = true;
      currentPage.value = page;
      
      try {
        const params = {
          page: page,
          limit: pageSize.value
        };
        
        // 添加过滤条件
        if (filter.value.status) {
          params.status = filter.value.status;
        }
        
        const response = await contactApi.getContacts(params);
        contacts.value = response.data.data;
        totalItems.value = response.data.count;
        totalPages.value = response.data.totalPages;
        currentPage.value = response.data.currentPage;
      } catch (error) {
        console.error('获取联系咨询列表失败:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // 计算分页范围
    const paginationRange = computed(() => {
      const range = [];
      const maxVisiblePages = 5;
      
      // 如果总页数小于等于最大可见页数，显示所有页码
      if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
          range.push(i);
        }
      } else {
        // 总是显示第一页
        range.push(1);
        
        // 当前页在前面几页
        if (currentPage.value <= 3) {
          range.push(2, 3, 4);
          range.push('...');
          range.push(totalPages.value);
        } 
        // 当前页在最后几页
        else if (currentPage.value >= totalPages.value - 2) {
          range.push('...');
          for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
            range.push(i);
          }
        } 
        // 当前页在中间
        else {
          range.push('...');
          range.push(currentPage.value - 1, currentPage.value, currentPage.value + 1);
          range.push('...');
          range.push(totalPages.value);
        }
      }
      
      return range;
    });
    
    // 格式化日期
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    // 格式化日期时间
    const formatDateTime = (dateStr) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    };
    
    // 格式化状态
    const formatStatus = (status) => {
      const statusMap = {
        pending: '待处理',
        contacted: '已联系',
        closed: '已关闭'
      };
      return statusMap[status] || status;
    };
    
    // 打开联系详情
    const openContactDetail = (contact) => {
      selectedContact.value = contact;
      currentStatus.value = contact.status;
      showDetailModal.value = true;
    };
    
    // 关闭联系详情
    const closeContactDetail = () => {
      showDetailModal.value = false;
      selectedContact.value = null;
    };
    
    // 更新联系状态
    const updateContactStatus = async () => {
      if (!selectedContact.value) return;
      
      try {
        await contactApi.updateContactStatus(selectedContact.value.id, {
          status: currentStatus.value
        });
        
        // 更新状态成功后关闭弹窗并刷新列表
        showDetailModal.value = false;
        selectedContact.value = null;
        fetchContacts(currentPage.value);
      } catch (error) {
        console.error('更新联系状态失败:', error);
      }
    };
    
    // 组件挂载时获取联系咨询列表
    onMounted(() => {
      fetchContacts();
    });
    
    return {
      contacts,
      loading,
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      filter,
      paginationRange,
      showDetailModal,
      selectedContact,
      currentStatus,
      fetchContacts,
      formatDate,
      formatDateTime,
      formatStatus,
      openContactDetail,
      closeContactDetail,
      updateContactStatus
    };
  }
};
</script>
