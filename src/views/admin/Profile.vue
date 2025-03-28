<template>
  <div class="admin-layout">
    <!-- 页面内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h1 class="text-xl font-semibold text-gray-900 mb-6">个人资料</h1>
          
          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-500">加载中...</p>
          </div>
          
          <div v-else class="space-y-8">
            <!-- 个人资料表单 -->
            <div class="bg-white overflow-hidden">
              <div class="border-b border-gray-200 pb-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900">基本信息</h3>
                <p class="mt-1 text-sm text-gray-500">更新您的基本信息</p>
              </div>
              
              <form @submit.prevent="updateProfile" class="mt-6 space-y-6">
                <!-- 用户名 -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">用户名</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="name" 
                      v-model="profileForm.name" 
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      :class="{'border-red-300': errors.name}"
                    >
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                  </div>
                </div>

                <!-- 邮箱 -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
                  <div class="mt-1">
                    <input 
                      type="email" 
                      id="email" 
                      v-model="profileForm.email" 
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      :class="{'border-red-300': errors.email}"
                    >
                    <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                  </div>
                </div>

                <!-- 角色（只读）-->
                <div>
                  <label for="role" class="block text-sm font-medium text-gray-700">角色</label>
                  <div class="mt-1">
                    <input 
                      type="text" 
                      id="role" 
                      :value="formatRole(profileForm.role)" 
                      disabled
                      class="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                    >
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button 
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {{ isSubmitting ? '保存中...' : '保存信息' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- 修改密码表单 -->
            <div class="bg-white overflow-hidden">
              <div class="border-b border-gray-200 pb-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900">修改密码</h3>
                <p class="mt-1 text-sm text-gray-500">请确保您的密码足够安全</p>
              </div>
              
              <form @submit.prevent="changePassword" class="mt-6 space-y-6">
                <!-- 当前密码 -->
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700">当前密码</label>
                  <div class="mt-1">
                    <input 
                      type="password" 
                      id="currentPassword" 
                      v-model="passwordForm.currentPassword" 
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      :class="{'border-red-300': passwordErrors.currentPassword}"
                    >
                    <p v-if="passwordErrors.currentPassword" class="mt-1 text-sm text-red-600">{{ passwordErrors.currentPassword }}</p>
                  </div>
                </div>

                <!-- 新密码 -->
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700">新密码</label>
                  <div class="mt-1">
                    <input 
                      type="password" 
                      id="newPassword" 
                      v-model="passwordForm.newPassword" 
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      :class="{'border-red-300': passwordErrors.newPassword}"
                    >
                    <p v-if="passwordErrors.newPassword" class="mt-1 text-sm text-red-600">{{ passwordErrors.newPassword }}</p>
                  </div>
                </div>

                <!-- 确认新密码 -->
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认新密码</label>
                  <div class="mt-1">
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      v-model="passwordForm.confirmPassword" 
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      :class="{'border-red-300': passwordErrors.confirmPassword}"
                    >
                    <p v-if="passwordErrors.confirmPassword" class="mt-1 text-sm text-red-600">{{ passwordErrors.confirmPassword }}</p>
                  </div>
                </div>

                <div class="pt-5">
                  <div class="flex justify-end">
                    <button 
                      type="submit"
                      :disabled="isPasswordSubmitting"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      {{ isPasswordSubmitting ? '保存中...' : '修改密码' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- 登录记录 -->
            <div class="bg-white overflow-hidden">
              <div class="border-b border-gray-200 pb-5">
                <h3 class="text-lg leading-6 font-medium text-gray-900">登录记录</h3>
                <p class="mt-1 text-sm text-gray-500">最近的登录活动</p>
              </div>
              
              <div class="mt-4">
                <div v-if="loginHistory.length === 0" class="text-center py-4">
                  <p class="text-gray-500 text-sm">暂无登录记录</p>
                </div>
                <div v-else class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">登录时间</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">IP地址</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">设备</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">状态</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      <tr v-for="(record, index) in loginHistory" :key="index" class="hover:bg-gray-50">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ formatDateTime(record.time) }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ record.ip }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ record.device }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                          <span :class="{
                            'px-2 py-1 text-xs font-medium rounded-full': true,
                            'bg-green-100 text-green-800': record.status === 'success',
                            'bg-red-100 text-red-800': record.status === 'failed'
                          }">
                            {{ record.status === 'success' ? '成功' : '失败' }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { userApi } from '../../api';

export default {
  setup() {
    const loading = ref(true);
    const isSubmitting = ref(false);
    const isPasswordSubmitting = ref(false);
    
    // 个人资料表单
    const profileForm = reactive({
      name: '',
      email: '',
      role: ''
    });
    
    // 修改密码表单
    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // 错误信息
    const errors = ref({});
    const passwordErrors = ref({});
    
    // 登录历史
    const loginHistory = ref([
      {
        time: new Date(),
        ip: '127.0.0.1',
        device: 'Chrome 98.0.4758.102 / Windows',
        status: 'success'
      }
    ]);
    
    // 获取当前用户信息
    const fetchUserProfile = async () => {
      loading.value = true;
      
      try {
        const response = await userApi.getCurrentUser();
        const user = response.data.data;
        
        profileForm.name = user.name;
        profileForm.email = user.email;
        profileForm.role = user.role;
        
        // 获取登录历史
        try {
          const historyResponse = await userApi.getLoginHistory();
          loginHistory.value = historyResponse.data.data;
        } catch (error) {
          console.error('获取登录历史失败:', error);
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // 验证个人资料表单
    const validateProfileForm = () => {
      const newErrors = {};
      
      if (!profileForm.name.trim()) {
        newErrors.name = '用户名不能为空';
      }
      
      if (!profileForm.email.trim()) {
        newErrors.email = '邮箱不能为空';
      } else if (!/^\S+@\S+\.\S+$/.test(profileForm.email)) {
        newErrors.email = '请输入有效的邮箱地址';
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };
    
    // 验证密码表单
    const validatePasswordForm = () => {
      const newErrors = {};
      
      if (!passwordForm.currentPassword) {
        newErrors.currentPassword = '当前密码不能为空';
      }
      
      if (!passwordForm.newPassword) {
        newErrors.newPassword = '新密码不能为空';
      } else if (passwordForm.newPassword.length < 6) {
        newErrors.newPassword = '密码长度至少为6位';
      }
      
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
      
      passwordErrors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };
    
    // 更新个人资料
    const updateProfile = async () => {
      if (!validateProfileForm()) {
        return;
      }
      
      isSubmitting.value = true;
      
      try {
        await userApi.updateCurrentUser({
          name: profileForm.name,
          email: profileForm.email
        });
        
        alert('个人资料更新成功');
      } catch (error) {
        console.error('更新个人资料失败:', error);
        if (error.response?.data?.message) {
          alert(`更新失败: ${error.response.data.message}`);
        } else {
          alert('更新失败，请检查表单数据并重试');
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // 修改密码
    const changePassword = async () => {
      if (!validatePasswordForm()) {
        return;
      }
      
      isPasswordSubmitting.value = true;
      
      try {
        await userApi.changePassword({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        });
        
        // 清空密码表单
        passwordForm.currentPassword = '';
        passwordForm.newPassword = '';
        passwordForm.confirmPassword = '';
        
        alert('密码修改成功');
      } catch (error) {
        console.error('修改密码失败:', error);
        if (error.response?.data?.message) {
          alert(`修改失败: ${error.response.data.message}`);
        } else {
          alert('修改失败，请检查表单数据并重试');
        }
      } finally {
        isPasswordSubmitting.value = false;
      }
    };
    
    // 格式化角色
    const formatRole = (role) => {
      const roleMap = {
        admin: '管理员',
        editor: '编辑',
        viewer: '观察者'
      };
      return roleMap[role] || role;
    };
    
    // 格式化日期时间
    const formatDateTime = (dateStr) => {
      if (!dateStr) return '';
      
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    };
    
    // 组件挂载时获取用户信息
    onMounted(() => {
      fetchUserProfile();
    });
    
    return {
      loading,
      isSubmitting,
      isPasswordSubmitting,
      profileForm,
      passwordForm,
      errors,
      passwordErrors,
      loginHistory,
      formatRole,
      formatDateTime,
      updateProfile,
      changePassword
    };
  }
};
</script>
