<template>
  <div class="admin-layout">
    <!-- 页面内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-semibold text-gray-900">产品管理</h1>
            <button @click="openCreateModal" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              添加产品
            </button>
          </div>

          <!-- 产品列表 -->
          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-500">加载中...</p>
          </div>
          
          <div v-else-if="products.length === 0" class="text-center py-8">
            <p class="text-gray-500">暂无产品数据</p>
          </div>
          
          <div v-else class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">产品名称</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">状态</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">创建时间</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">操作</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ product.id }}</td>
                  <td class="px-3 py-4 text-sm text-gray-500">{{ product.name }}</td>
                  <td class="px-3 py-4 text-sm">
                    <span :class="{
                      'px-2 py-1 text-xs font-medium rounded-full': true,
                      'bg-green-100 text-green-800': product.isActive,
                      'bg-gray-100 text-gray-800': !product.isActive
                    }">
                      {{ product.isActive ? '已上线' : '已下线' }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(product.createdAt) }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <router-link :to="`/admin/products/edit/${product.id}`" class="text-primary-600 hover:text-primary-900 mr-4">编辑</router-link>
                    <button @click="confirmDelete(product)" class="text-red-600 hover:text-red-900">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 删除确认对话框 -->
    <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">确认删除</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    您确定要删除 "{{ productToDelete?.name }}" 产品吗？此操作无法撤销。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="deleteProduct" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              删除
            </button>
            <button @click="cancelDelete" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { productApi } from '../../api';

export default {
  setup() {
    const router = useRouter();
    const products = ref([]);
    const loading = ref(true);
    const showDeleteModal = ref(false);
    const productToDelete = ref(null);

    // 获取产品列表
    const fetchProducts = async () => {
      loading.value = true;
      try {
        const response = await productApi.getProducts();
        products.value = response.data.data;
      } catch (error) {
        console.error('获取产品列表失败:', error);
      } finally {
        loading.value = false;
      }
    };

    // 格式化日期
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    // 打开创建产品模态框
    const openCreateModal = () => {
      router.push('/admin/products/edit/new');
    };

    // 确认删除产品
    const confirmDelete = (product) => {
      productToDelete.value = product;
      showDeleteModal.value = true;
    };

    // 取消删除
    const cancelDelete = () => {
      showDeleteModal.value = false;
      productToDelete.value = null;
    };

    // 删除产品
    const deleteProduct = async () => {
      if (!productToDelete.value) return;

      try {
        await productApi.deleteProduct(productToDelete.value.id);
        showDeleteModal.value = false;
        productToDelete.value = null;
        fetchProducts(); // 重新加载列表
      } catch (error) {
        console.error('删除产品失败:', error);
      }
    };

    // 组件挂载时获取产品列表
    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      loading,
      showDeleteModal,
      productToDelete,
      formatDate,
      openCreateModal,
      confirmDelete,
      cancelDelete,
      deleteProduct
    };
  }
};
</script>
