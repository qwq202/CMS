<template>
  <div class="admin-layout">
    <!-- 页面内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-semibold text-gray-900">用户管理</h1>
            
            <button 
              @click="showCreateModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              添加用户
            </button>
          </div>

          <!-- 用户列表 -->
          <div v-if="loading" class="text-center py-8">
            <p class="text-gray-500">加载中...</p>
          </div>
          
          <div v-else-if="users.length === 0" class="text-center py-8">
            <p class="text-gray-500">暂无用户数据</p>
          </div>
          
          <div v-else>
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">姓名</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">邮箱</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">角色</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">状态</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">创建时间</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ user.id }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.email }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatRole(user.role) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                      <span :class="{
                        'px-2 py-1 text-xs font-medium rounded-full': true,
                        'bg-green-100 text-green-800': user.isActive,
                        'bg-red-100 text-red-800': !user.isActive
                      }">
                        {{ user.isActive ? '启用' : '禁用' }}
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(user.createdAt) }}</td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button 
                        @click="editUser(user)"
                        class="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        编辑
                      </button>
                      <button 
                        v-if="currentUser.id !== user.id"
                        @click="confirmDeleteUser(user)"
                        class="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 创建/编辑用户弹窗 -->
    <div 
      v-if="showCreateModal || showEditModal" 
      class="fixed z-10 inset-0 overflow-y-auto" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ showCreateModal ? '创建新用户' : '编辑用户' }}
                </h3>
                <div class="mt-4">
                  <form @submit.prevent="showCreateModal ? createUser() : updateUser()" class="space-y-6">
                    <!-- 用户名 -->
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700">用户名 <span class="text-red-500">*</span></label>
                      <div class="mt-1">
                        <input 
                          type="text" 
                          id="name" 
                          v-model="userForm.name" 
                          required
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          :class="{'border-red-300': errors.name}"
                        >
                        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
                      </div>
                    </div>

                    <!-- 邮箱 -->
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700">邮箱 <span class="text-red-500">*</span></label>
                      <div class="mt-1">
                        <input 
                          type="email" 
                          id="email" 
                          v-model="userForm.email" 
                          required
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          :class="{'border-red-300': errors.email}"
                        >
                        <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                      </div>
                    </div>

                    <!-- 角色 -->
                    <div>
                      <label for="role" class="block text-sm font-medium text-gray-700">角色 <span class="text-red-500">*</span></label>
                      <div class="mt-1">
                        <select 
                          id="role" 
                          v-model="userForm.role" 
                          required
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        >
                          <option value="admin">管理员</option>
                          <option value="editor">编辑</option>
                          <option value="viewer">观察者</option>
                        </select>
                      </div>
                    </div>

                    <!-- 密码 (仅创建用户或重置密码时显示) -->
                    <div v-if="showCreateModal || resetPassword">
                      <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium text-gray-700">
                          密码 <span class="text-red-500">*</span>
                        </label>
                        <div v-if="showEditModal && !resetPassword" class="text-sm">
                          <button 
                            type="button"
                            @click="resetPassword = true"
                            class="font-medium text-primary-600 hover:text-primary-500"
                          >
                            重置密码
                          </button>
                        </div>
                      </div>
                      <div class="mt-1">
                        <input 
                          type="password" 
                          id="password" 
                          v-model="userForm.password" 
                          :required="showCreateModal || resetPassword"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          :class="{'border-red-300': errors.password}"
                        >
                        <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                      </div>
                    </div>

                    <!-- 确认密码 (仅创建用户或重置密码时显示) -->
                    <div v-if="showCreateModal || resetPassword">
                      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                        确认密码 <span class="text-red-500">*</span>
                      </label>
                      <div class="mt-1">
                        <input 
                          type="password" 
                          id="confirmPassword" 
                          v-model="userForm.confirmPassword" 
                          :required="showCreateModal || resetPassword"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          :class="{'border-red-300': errors.confirmPassword}"
                        >
                        <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
                      </div>
                    </div>

                    <!-- 用户状态 -->
                    <div class="flex items-center">
                      <input 
                        id="isActive" 
                        type="checkbox" 
                        v-model="userForm.isActive"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      >
                      <label for="isActive" class="ml-2 block text-sm text-gray-900">用户状态（启用/禁用）</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button"
              @click="showCreateModal ? createUser() : updateUser()"
              :disabled="isSubmitting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ isSubmitting ? '提交中...' : (showCreateModal ? '创建' : '保存') }}
            </button>
            <button 
              type="button"
              @click="closeUserModal"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 删除确认弹窗 -->
    <div 
      v-if="showDeleteModal" 
      class="fixed z-10 inset-0 overflow-y-auto" 
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
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
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  删除用户
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    您确定要删除用户 "{{ userToDelete?.name }}" 吗？此操作无法撤销。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button"
              @click="deleteUser"
              :disabled="isSubmitting"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{ isSubmitting ? '删除中...' : '删除' }}
            </button>
            <button 
              type="button"
              @click="showDeleteModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
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
    const users = ref([]);
    const loading = ref(true);
    const isSubmitting = ref(false);
    
    // 当前登录用户
    const currentUser = ref({});
    
    // 用户表单
    const userForm = reactive({
      name: '',
      email: '',
      role: 'editor',
      password: '',
      confirmPassword: '',
      isActive: true
    });
    
    // 错误信息
    const errors = ref({});
    
    // 模态框状态
    const showCreateModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const resetPassword = ref(false);
    
    // 待删除用户
    const userToDelete = ref(null);
    const userToEdit = ref(null);
    
    // 获取用户列表
    const fetchUsers = async () => {
      loading.value = true;
      
      try {
        const response = await userApi.getUsers();
        users.value = response.data.data;
        
        // 获取当前用户信息
        const currentUserResponse = await userApi.getCurrentUser();
        currentUser.value = currentUserResponse.data.data;
      } catch (error) {
        console.error('获取用户列表失败:', error);
      } finally {
        loading.value = false;
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
    
    // 格式化日期
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    // 验证表单
    const validateForm = () => {
      const newErrors = {};
      
      if (!userForm.name.trim()) {
        newErrors.name = '用户名不能为空';
      }
      
      if (!userForm.email.trim()) {
        newErrors.email = '邮箱不能为空';
      } else if (!/^\S+@\S+\.\S+$/.test(userForm.email)) {
        newErrors.email = '请输入有效的邮箱地址';
      }
      
      if ((showCreateModal.value || resetPassword.value) && !userForm.password) {
        newErrors.password = '密码不能为空';
      } else if ((showCreateModal.value || resetPassword.value) && userForm.password.length < 6) {
        newErrors.password = '密码长度至少为6位';
      }
      
      if ((showCreateModal.value || resetPassword.value) && userForm.password !== userForm.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };
    
    // 创建用户
    const createUser = async () => {
      if (!validateForm()) {
        return;
      }
      
      isSubmitting.value = true;
      
      try {
        await userApi.createUser({
          name: userForm.name,
          email: userForm.email,
          role: userForm.role,
          password: userForm.password,
          isActive: userForm.isActive
        });
        
        showCreateModal.value = false;
        resetForm();
        fetchUsers();
      } catch (error) {
        console.error('创建用户失败:', error);
        if (error.response?.data?.message) {
          alert(`创建失败: ${error.response.data.message}`);
        } else {
          alert('创建失败，请检查表单数据并重试');
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // 编辑用户
    const editUser = (user) => {
      userToEdit.value = user;
      userForm.name = user.name;
      userForm.email = user.email;
      userForm.role = user.role;
      userForm.isActive = user.isActive;
      userForm.password = '';
      userForm.confirmPassword = '';
      resetPassword.value = false;
      showEditModal.value = true;
    };
    
    // 更新用户
    const updateUser = async () => {
      if (!validateForm()) {
        return;
      }
      
      isSubmitting.value = true;
      
      try {
        const userData = {
          name: userForm.name,
          email: userForm.email,
          role: userForm.role,
          isActive: userForm.isActive
        };
        
        // 如果重置了密码，添加密码字段
        if (resetPassword.value) {
          userData.password = userForm.password;
        }
        
        await userApi.updateUser(userToEdit.value.id, userData);
        
        showEditModal.value = false;
        resetForm();
        fetchUsers();
      } catch (error) {
        console.error('更新用户失败:', error);
        if (error.response?.data?.message) {
          alert(`更新失败: ${error.response.data.message}`);
        } else {
          alert('更新失败，请检查表单数据并重试');
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // 确认删除用户
    const confirmDeleteUser = (user) => {
      userToDelete.value = user;
      showDeleteModal.value = true;
    };
    
    // 删除用户
    const deleteUser = async () => {
      if (!userToDelete.value) return;
      
      isSubmitting.value = true;
      
      try {
        await userApi.deleteUser(userToDelete.value.id);
        
        showDeleteModal.value = false;
        userToDelete.value = null;
        fetchUsers();
      } catch (error) {
        console.error('删除用户失败:', error);
        if (error.response?.data?.message) {
          alert(`删除失败: ${error.response.data.message}`);
        } else {
          alert('删除失败，请重试');
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // 关闭用户表单模态框
    const closeUserModal = () => {
      showCreateModal.value = false;
      showEditModal.value = false;
      resetForm();
    };
    
    // 重置表单
    const resetForm = () => {
      userForm.name = '';
      userForm.email = '';
      userForm.role = 'editor';
      userForm.password = '';
      userForm.confirmPassword = '';
      userForm.isActive = true;
      resetPassword.value = false;
      errors.value = {};
      userToEdit.value = null;
    };
    
    // 组件挂载时获取用户列表
    onMounted(() => {
      fetchUsers();
    });
    
    return {
      users,
      loading,
      isSubmitting,
      currentUser,
      userForm,
      errors,
      showCreateModal,
      showEditModal,
      showDeleteModal,
      resetPassword,
      userToDelete,
      formatRole,
      formatDate,
      fetchUsers,
      createUser,
      editUser,
      updateUser,
      confirmDeleteUser,
      deleteUser,
      closeUserModal
    };
  }
};
</script>
