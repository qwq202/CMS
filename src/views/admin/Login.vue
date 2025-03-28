<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        云智汇管理系统
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        请输入管理员账号和密码
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="loginError" class="mb-4 bg-red-50 border border-red-300 text-red-700 p-3 rounded">
          {{ loginError }}
        </div>
        
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required 
                v-model="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" required 
                v-model="password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" 
                v-model="rememberMe"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                记住我
              </label>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="isLoading" 
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {{ isLoading ? '登录中...' : '登 录' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authApi } from '../../api';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const isLoading = ref(false);
    const loginError = ref('');

    const handleLogin = async () => {
      loginError.value = '';
      isLoading.value = true;
      
      try {
        const response = await authApi.login({
          email: email.value,
          password: password.value
        });
        
        // 保存token和用户信息到本地存储
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        
        // 重定向到管理后台首页
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('登录失败:', error);
        loginError.value = error.response?.data?.message || '登录失败，请检查您的邮箱和密码';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      rememberMe,
      isLoading,
      loginError,
      handleLogin
    };
  }
};
</script>
