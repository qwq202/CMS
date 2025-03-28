<template>
  <div class="admin-layout">
    <!-- 页面内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="mb-6">
            <router-link to="/admin/solutions" class="text-primary-600 hover:text-primary-800 font-medium">
              &larr; 返回解决方案列表
            </router-link>
          </div>
          
          <h1 class="text-xl font-semibold text-gray-900 mb-6">
            {{ isNewSolution ? '创建解决方案' : '编辑解决方案: ' + form.name }}
          </h1>

          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-500">加载中...</p>
          </div>
          
          <form v-else @submit.prevent="saveSolution" class="space-y-6">
            <!-- 解决方案名称 -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">解决方案名称 <span class="text-red-500">*</span></label>
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
                <p class="mt-1 text-xs text-gray-500">URL标识用于构建解决方案页面的URL，仅允许使用小写字母、数字和连字符，例如：finance-solution</p>
              </div>
            </div>

            <!-- 适用行业 -->
            <div>
              <label for="industry" class="block text-sm font-medium text-gray-700">适用行业 <span class="text-red-500">*</span></label>
              <div class="mt-1">
                <input 
                  type="text" 
                  id="industry" 
                  v-model="form.industry" 
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  :class="{'border-red-300': errors.industry}"
                >
                <p v-if="errors.industry" class="mt-1 text-sm text-red-600">{{ errors.industry }}</p>
              </div>
            </div>

            <!-- 解决方案简介 -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">解决方案简介 <span class="text-red-500">*</span></label>
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

            <!-- 解决方案图片 -->
            <div>
              <label for="image" class="block text-sm font-medium text-gray-700">解决方案图片URL</label>
              <div class="mt-1">
                <input 
                  type="text" 
                  id="image" 
                  v-model="form.image" 
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
              </div>
            </div>

            <!-- 行业挑战 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">行业挑战</label>
              <div class="mt-1 border border-gray-300 rounded-md p-4">
                <div v-for="(challenge, index) in challenges" :key="index" class="flex items-center mb-2">
                  <input 
                    type="text" 
                    v-model="challenges[index]" 
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="输入行业挑战"
                  >
                  <button 
                    type="button"
                    @click="removeChallenge(index)"
                    class="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <button 
                  type="button"
                  @click="addChallenge"
                  class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  添加挑战
                </button>
              </div>
            </div>

            <!-- 客户收益 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">客户收益</label>
              <div class="mt-1 border border-gray-300 rounded-md p-4">
                <div v-for="(benefit, index) in benefits" :key="index" class="mb-4">
                  <div class="flex items-center mb-2">
                    <input 
                      type="text" 
                      v-model="benefits[index].title" 
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="收益标题"
                    >
                    <button 
                      type="button"
                      @click="removeBenefit(index)"
                      class="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <textarea 
                    v-model="benefits[index].description" 
                    rows="2" 
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="收益描述"
                  ></textarea>
                </div>
                <button 
                  type="button"
                  @click="addBenefit"
                  class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  添加收益
                </button>
              </div>
            </div>

            <!-- 案例研究 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">案例研究</label>
              <div class="mt-1 border border-gray-300 rounded-md p-4">
                <div v-for="(caseStudy, index) in caseStudies" :key="index" class="mb-4">
                  <div class="flex items-center mb-2">
                    <input 
                      type="text" 
                      v-model="caseStudies[index].title" 
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="案例标题"
                    >
                    <button 
                      type="button"
                      @click="removeCaseStudy(index)"
                      class="ml-2 inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <textarea 
                    v-model="caseStudies[index].content" 
                    rows="3" 
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="案例内容"
                  ></textarea>
                </div>
                <button 
                  type="button"
                  @click="addCaseStudy"
                  class="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  添加案例
                </button>
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
              <label for="isActive" class="ml-2 block text-sm text-gray-900">解决方案上线（在前台显示）</label>
            </div>

            <!-- 表单操作 -->
            <div class="flex justify-end space-x-4">
              <button 
                type="button"
                @click="router.push('/admin/solutions')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                取消
              </button>
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {{ isSubmitting ? '保存中...' : '保存解决方案' }}
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
import { solutionApi } from '../../api';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const solutionId = route.params.id;
    const isNewSolution = computed(() => solutionId === 'new');
    
    const loading = ref(true);
    const isSubmitting = ref(false);
    const errors = ref({});
    
    // 表单数据
    const form = ref({
      name: '',
      slug: '',
      industry: '',
      description: '',
      fullDescription: '',
      image: '',
      isActive: true
    });
    
    // 行业挑战
    const challenges = ref(['']);
    
    // 客户收益
    const benefits = ref([{ title: '', description: '' }]);
    
    // 案例研究
    const caseStudies = ref([{ title: '', content: '' }]);
    
    // 获取解决方案详情
    const fetchSolution = async () => {
      if (isNewSolution.value) {
        loading.value = false;
        return;
      }
      
      try {
        loading.value = true;
        const response = await solutionApi.getSolutionBySlug(solutionId);
        const solution = response.data.data;
        
        // 填充表单数据
        form.value = {
          name: solution.name,
          slug: solution.slug,
          industry: solution.industry,
          description: solution.description,
          fullDescription: solution.fullDescription || '',
          image: solution.image || '',
          isActive: solution.isActive
        };
        
        // 解析挑战JSON
        if (solution.challenges) {
          try {
            const challengesArr = JSON.parse(solution.challenges);
            challenges.value = Array.isArray(challengesArr) ? challengesArr : [''];
          } catch (error) {
            console.error('解析挑战JSON失败:', error);
            challenges.value = [''];
          }
        }
        
        // 解析收益JSON
        if (solution.benefits) {
          try {
            const benefitsArr = JSON.parse(solution.benefits);
            benefits.value = Array.isArray(benefitsArr) ? benefitsArr : [{ title: '', description: '' }];
          } catch (error) {
            console.error('解析收益JSON失败:', error);
            benefits.value = [{ title: '', description: '' }];
          }
        }
        
        // 解析案例研究JSON
        if (solution.caseStudies) {
          try {
            const caseStudiesArr = JSON.parse(solution.caseStudies);
            caseStudies.value = Array.isArray(caseStudiesArr) ? caseStudiesArr : [{ title: '', content: '' }];
          } catch (error) {
            console.error('解析案例研究JSON失败:', error);
            caseStudies.value = [{ title: '', content: '' }];
          }
        }
      } catch (error) {
        console.error('获取解决方案详情失败:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // 验证表单
    const validateForm = () => {
      const newErrors = {};
      
      if (!form.value.name.trim()) {
        newErrors.name = '解决方案名称不能为空';
      }
      
      if (!form.value.slug.trim()) {
        newErrors.slug = 'URL标识不能为空';
      } else if (!/^[a-z0-9-]+$/.test(form.value.slug)) {
        newErrors.slug = 'URL标识只能包含小写字母、数字和连字符';
      }
      
      if (!form.value.industry.trim()) {
        newErrors.industry = '适用行业不能为空';
      }
      
      if (!form.value.description.trim()) {
        newErrors.description = '解决方案简介不能为空';
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };
    
    // 添加挑战
    const addChallenge = () => {
      challenges.value.push('');
    };
    
    // 移除挑战
    const removeChallenge = (index) => {
      challenges.value.splice(index, 1);
      if (challenges.value.length === 0) {
        challenges.value.push('');
      }
    };
    
    // 添加收益
    const addBenefit = () => {
      benefits.value.push({ title: '', description: '' });
    };
    
    // 移除收益
    const removeBenefit = (index) => {
      benefits.value.splice(index, 1);
      if (benefits.value.length === 0) {
        benefits.value.push({ title: '', description: '' });
      }
    };
    
    // 添加案例研究
    const addCaseStudy = () => {
      caseStudies.value.push({ title: '', content: '' });
    };
    
    // 移除案例研究
    const removeCaseStudy = (index) => {
      caseStudies.value.splice(index, 1);
      if (caseStudies.value.length === 0) {
        caseStudies.value.push({ title: '', content: '' });
      }
    };
    
    // 保存解决方案
    const saveSolution = async () => {
      if (!validateForm()) {
        return;
      }
      
      isSubmitting.value = true;
      
      try {
        // 准备提交的数据
        const solutionData = {
          ...form.value,
          challenges: JSON.stringify(challenges.value.filter(c => c.trim())),
          benefits: JSON.stringify(benefits.value.filter(b => b.title.trim() || b.description.trim())),
          caseStudies: JSON.stringify(caseStudies.value.filter(c => c.title.trim() || c.content.trim()))
        };
        
        if (isNewSolution.value) {
          // 创建新解决方案
          await solutionApi.createSolution(solutionData);
        } else {
          // 更新现有解决方案
          await solutionApi.updateSolution(solutionId, solutionData);
        }
        
        // 跳转到解决方案列表页
        router.push('/admin/solutions');
      } catch (error) {
        console.error('保存解决方案失败:', error);
        if (error.response?.data?.message) {
          alert(`保存失败: ${error.response.data.message}`);
        } else {
          alert('保存失败，请检查表单数据并重试');
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // 组件挂载时加载解决方案数据
    onMounted(() => {
      fetchSolution();
    });
    
    return {
      router,
      isNewSolution,
      loading,
      isSubmitting,
      form,
      challenges,
      benefits,
      caseStudies,
      errors,
      addChallenge,
      removeChallenge,
      addBenefit,
      removeBenefit,
      addCaseStudy,
      removeCaseStudy,
      saveSolution
    };
  }
};
</script>
