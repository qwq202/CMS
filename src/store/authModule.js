import axios from 'axios';
import router from '../router';

// 从本地存储获取令牌
const token = localStorage.getItem('token');
// 如果有令牌，设置默认请求头
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// 身份验证模块
export default {
  namespaced: true,
  
  state: {
    token: token || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
  },
  
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
    }
  },
  
  actions: {
    // 登录
    async login({ commit }, credentials) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      try {
        const response = await axios.post('/api/auth/login', credentials);
        const { token, data } = response.data;
        
        // 存储令牌和用户信息
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
        
        // 设置请求头
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        commit('SET_TOKEN', token);
        commit('SET_USER', data);
        
        return { success: true };
      } catch (error) {
        console.error('登录失败:', error);
        const errorMessage = error.response?.data?.message || '登录失败，请检查您的凭据';
        commit('SET_ERROR', errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    // 注销
    logout({ commit }) {
      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // 清除请求头
      delete axios.defaults.headers.common['Authorization'];
      
      // 清除状态
      commit('CLEAR_AUTH');
      
      // 重定向到登录页
      router.push('/admin/login');
    },
    
    // 自动登录（刷新页面时调用）
    autoLogin({ commit, state }) {
      if (state.token && state.user) {
        // 已经有令牌和用户信息，无需操作
        return { success: true };
      }
      
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        // 设置请求头
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        commit('SET_TOKEN', token);
        commit('SET_USER', JSON.parse(user));
        return { success: true };
      }
      
      return { success: false };
    },
    
    // 检查是否有权限
    checkAuth({ state }) {
      return !!state.token && !!state.user;
    },
    
    // 检查是否是管理员
    checkAdmin({ state }) {
      return state.user && state.user.role === 'admin';
    }
  },
  
  getters: {
    // 是否已认证
    isAuthenticated: (state) => !!state.token && !!state.user,
    
    // 是否是管理员
    isAdmin: (state) => state.user && state.user.role === 'admin',
    
    // 获取用户
    getUser: (state) => state.user,
    
    // 获取令牌
    getToken: (state) => state.token,
    
    // 是否正在加载
    isLoading: (state) => state.loading,
    
    // 获取错误
    getError: (state) => state.error
  }
};
