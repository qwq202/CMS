import { createStore } from 'vuex';
import authModule from './authModule';

// 创建Vuex存储
export default createStore({
  // 根状态
  state: {
    appLoading: false
  },
  
  // 根状态修改方法
  mutations: {
    SET_APP_LOADING(state, loading) {
      state.appLoading = loading;
    }
  },
  
  // 根级别的操作
  actions: {
    setAppLoading({ commit }, loading) {
      commit('SET_APP_LOADING', loading);
    }
  },
  
  // 根级别的计算属性
  getters: {
    isAppLoading: (state) => state.appLoading
  },
  
  // 模块
  modules: {
    auth: authModule
  }
});
