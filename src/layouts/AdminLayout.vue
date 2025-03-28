<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/admin/dashboard" class="text-xl font-bold text-primary-600">云智汇管理系统</router-link>
            </div>
          </div>
          <div class="flex items-center">
            <div class="ml-3 relative" ref="profileDropdown">
              <div>
                <button @click="isProfileMenuOpen = !isProfileMenuOpen" class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-semibold">
                    {{ currentUser?.name?.charAt(0) || 'U' }}
                  </div>
                  <span class="ml-2 text-gray-700">{{ currentUser?.name || '用户' }}</span>
                  <svg class="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <!-- 下拉菜单 -->
              <div v-if="isProfileMenuOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <router-link to="/admin/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  个人设置
                </router-link>
                <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  退出登录
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex">
          <!-- 侧边栏导航 -->
          <div class="w-64 mr-8">
            <nav class="space-y-1">
              <div class="space-y-1">
                <router-link to="/admin/dashboard" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class="[isActive('/admin/dashboard') ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']">
                  <svg class="mr-3 h-6 w-6" :class="[isActive('/admin/dashboard') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>仪表盘</span>
                </router-link>

                <router-link to="/admin/products" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class="[isActive('/admin/products') ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']">
                  <svg class="mr-3 h-6 w-6" :class="[isActive('/admin/products') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>产品管理</span>
                </router-link>

                <router-link to="/admin/solutions" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class="[isActive('/admin/solutions') ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']">
                  <svg class="mr-3 h-6 w-6" :class="[isActive('/admin/solutions') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>解决方案管理</span>
                </router-link>

                <router-link to="/admin/contacts" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class="[isActive('/admin/contacts') ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']">
                  <svg class="mr-3 h-6 w-6" :class="[isActive('/admin/contacts') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>联系咨询管理</span>
                </router-link>

                <router-link to="/admin/users" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class="[isActive('/admin/users') ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']">
                  <svg class="mr-3 h-6 w-6" :class="[isActive('/admin/users') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>用户管理</span>
                </router-link>

                <router-link to="/admin/settings" class="group flex items-center px-3 py-2 text-sm font-medium rounded-md" :class="[isActive('/admin/settings') ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']">
                  <svg class="mr-3 h-6 w-6" :class="[isActive('/admin/settings') ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>站点设置</span>
                </router-link>
              </div>
            </nav>
          </div>

          <!-- 主内容区域 -->
          <div class="flex-1">
            <div class="bg-white shadow rounded-lg p-6">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'AdminLayout',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isProfileMenuOpen = ref(false);
    const profileDropdown = ref(null);
    const currentUser = ref(null);

    // 检查路径是否激活
    const isActive = (path) => {
      return route.path.startsWith(path);
    };

    // 退出登录
    const handleLogout = () => {
      localStorage.removeItem('token');
      router.push('/admin/login');
    };

    // 获取当前用户信息
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          currentUser.value = { name: '管理员' }; // 简化示例，实际应从API获取
        }
      } catch (error) {
        console.error('获取用户信息失败', error);
      }
    };

    // 点击外部关闭下拉菜单
    const handleClickOutside = (event) => {
      if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
        isProfileMenuOpen.value = false;
      }
    };

    onMounted(() => {
      fetchCurrentUser();
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      isProfileMenuOpen,
      profileDropdown,
      currentUser,
      isActive,
      handleLogout
    };
  }
};
</script>
