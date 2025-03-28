<template>
  <div class="admin-layout">
    <!-- 页面内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="mb-6">
            <router-link to="/admin/products" class="text-primary-600 hover:text-primary-800 font-medium">
              &larr; 返回产品列表
            </router-link>
          </div>
          
          <h1 class="text-xl font-semibold text-gray-900 mb-6">
            {{ isNewProduct ? '创建产品' : '编辑产品: ' + form.name }}
          </h1>

          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-500">加载中...</p>
          </div>
          
          <form v-else @submit.prevent="saveProduct" class="space-y-6">
            <!-- 产品名称 -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">产品名称 <span class="text-red-500">*</span></label>
              <div class="mt-1">
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :class="{'border-red-300': errors.name}"
                >
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>
            </div>

            <!-- URL标识 -->
            <div>
              <label for="slug" class="block text-sm font-medium text-gray-700">URL标识 <span class="text-red-500">*</span></label>
              <div class="mt-1">
                <input 
                  type="text" 
                  id="slug" 
                  v-model="form.slug" 
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :class="{'border-red-300': errors.slug}"
                >
                <p v-if="errors.slug" class="mt-1 text-sm text-red-600">{{ errors.slug }}</p>
                <p class="mt-1 text-xs text-gray-500">URL标识用于构建产品页面的URL，仅允许使用小写字母、数字和连字符，例如：cloud-data-platform</p>
              </div>
            </div>

            <!-- 产品简介 -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">产品简介 <span class="text-red-500">*</span></label>
              <div class="mt-1">
                <textarea 
                  id="description" 
                  v-model="form.description" 
                  rows="3" 
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :class="{'border-red-300': errors.description}"
                ></textarea>
                <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
              </div>
            </div>

            <!-- 详细描述 -->
            <div>
              <label for="fullDescription" class="block text-sm font-medium text-gray-700">详细描述</label>
              <div class="mt-1">
                <textarea 
                  id="fullDescription" 
                  v-model="form.fullDescription" 
                  rows="6" 
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                ></textarea>
              </div>
            </div>

            <!-- 产品图片 -->
            <div>
              <label for="image" class="block text-sm font-medium text-gray-700">产品图片URL</label>
              <div class="mt-1">
                <input 
                  type="text" 
                  id="image" 
                  v-model="form.image" 
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
              </div>
            </div>

            <!-- 产品特点 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">产品特点</label>
              <div class="mt-1 border border-gray-300 rounded-md p-4">
                <div v-for="(feature, index) in features" :key="index" class="flex items-center mb-2">
                  <input 
                    type="text" 
                    v-model="features[index]" 
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="输入产品特点"
                  >
                  <button 
                    type="button"
                    @click="removeFeature(index)"
                    class="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <button 
                  type="button"
                  @click="addFeature"
                  class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  添加特点
                </button>
              </div>
            </div>

            <!-- 产品类别 -->
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700">产品类别</label>
              <div class="mt-1">
                <select 
                  id="category" 
                  v-model="form.category" 
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="数据平台">数据平台</option>
                  <option value="协作工具">协作工具</option>
                  <option value="安全产品">安全产品</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <!-- 激活状态 -->
            <div class="flex items-center">
              <input 
                id="isActive" 
                type="checkbox" 
                v-model="form.isActive"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              >
              <label for="isActive" class="ml-2 block text-sm text-gray-900">产品上线（在前台显示）</label>
            </div>

            <!-- 表单操作 -->
            <div class="flex justify-end space-x-4">
              <button 
                type="button"
                @click="router.push('/admin/products')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                取消
              </button>
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {{ isSubmitting ? '保存中...' : '保存产品' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { productApi } from '../../api';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const productId = route.params.id;
    const isNewProduct = computed(() => productId === 'new');
    
    const loading = ref(true);
    const isSubmitting = ref(false);
    const errors = ref({});
    
    // 表单数据
    const form = ref({
      name: '',
      slug: '',
      description: '',
      fullDescription: '',
      image: '',
      category: '数据平台',
      isActive: true
    });
    
    // 产品特点（JSON格式存储在数据库中）
    const features = ref(['']);
    
    // 获取产品详情
    const fetchProduct = async () => {
      if (isNewProduct.value) {
        loading.value = false;
        return;
      }
      
      try {
        loading.value = true;
        const response = await productApi.getProductBySlug(productId);
        const product = response.data.data;
        
        // 填充表单数据
        form.value = {
          name: product.name,
          slug: product.slug,
          description: product.description,
          fullDescription: product.fullDescription || '',
          image: product.image || '',
          category: product.category || '数据平台',
          isActive: product.isActive
        };
        
        // 解析产品特点JSON
        if (product.features) {
          try {
            const featuresArr = JSON.parse(product.features);
            features.value = Array.isArray(featuresArr) ? featuresArr : [''];
          } catch (error) {
            console.error('解析产品特点JSON失败:', error);
            features.value = [''];
          }
        }
      } catch (error) {
        console.error('获取产品详情失败:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // 验证表单
    const validateForm = () => {
      const newErrors = {};
      
      if (!form.value.name.trim()) {
        newErrors.name = '产品名称不能为空';
      }
      
      if (!form.value.slug.trim()) {
        newErrors.slug = 'URL标识不能为空';
      } else if (!/^[a-z0-9-]+$/.test(form.value.slug)) {
        newErrors.slug = 'URL标识只能包含小写字母、数字和连字符';
      }
      
      if (!form.value.description.trim()) {
        newErrors.description = '产品简介不能为空';
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };
    
    // 添加产品特点
    const addFeature = () => {
      features.value.push('');
    };
    
    // 移除产品特点
    const removeFeature = (index) => {
      features.value.splice(index, 1);
      if (features.value.length === 0) {
        features.value.push('');
      }
    };
    
    // 保存产品
    const saveProduct = async () => {
      if (!validateForm()) {
        return;
      }
      
      isSubmitting.value = true;
      
      try {
        // 准备提交的数据
        const productData = {
          ...form.value,
          features: JSON.stringify(features.value.filter(f => f.trim()))
        };
        
        if (isNewProduct.value) {
          // 创建新产品
          await productApi.createProduct(productData);
        } else {
          // 更新现有产品
          await productApi.updateProduct(productId, productData);
        }
        
        // 跳转到产品列表页
        router.push('/admin/products');
      } catch (error) {
        console.error('保存产品失败:', error);
        if (error.response?.data?.message) {
          alert(`保存失败: ${error.response.data.message}`);
        } else {
          alert('保存失败，请检查表单数据并重试');
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // 组件挂载时加载产品数据
    onMounted(() => {
      fetchProduct();
    });
    
    return {
      router,
      isNewProduct,
      loading,
      isSubmitting,
      form,
      features,
      errors,
      addFeature,
      removeFeature,
      saveProduct
    };
  }
};
</script>
