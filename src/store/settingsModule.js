import settingService from '../services/settingService';

// 站点设置存储模块
export default {
  namespaced: true,

  state: {
    settings: null,
    loaded: false,
    loading: false,
    error: null
  },

  mutations: {
    SET_SETTINGS(state, settings) {
      state.settings = settings;
      state.loaded = true;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },

  actions: {
    // 加载公开设置
    async loadPublicSettings({ commit, state }) {
      // 如果已经加载过，不再重复加载
      if (state.loaded && state.settings) return;

      commit('SET_LOADING', true);
      try {
        const settings = await settingService.getPublicSettings();
        commit('SET_SETTINGS', settings);
        commit('SET_ERROR', null);
      } catch (error) {
        console.error('加载设置失败:', error);
        commit('SET_ERROR', '无法加载站点设置数据');
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // 加载所有设置（管理员）
    async loadAllSettings({ commit }) {
      commit('SET_LOADING', true);
      try {
        const settings = await settingService.getAllSettings();
        commit('SET_SETTINGS', settings);
        commit('SET_ERROR', null);
      } catch (error) {
        console.error('加载所有设置失败:', error);
        commit('SET_ERROR', '无法加载站点设置数据');
      } finally {
        commit('SET_LOADING', false);
      }
    },

    // 更新单个设置
    async updateSetting({ dispatch }, { key, data }) {
      try {
        await settingService.updateSetting(key, data);
        // 更新后重新加载所有设置
        await dispatch('loadAllSettings');
        return { success: true };
      } catch (error) {
        console.error('更新设置失败:', error);
        return { success: false, error };
      }
    },

    // 批量更新设置
    async bulkUpdateSettings({ dispatch }, settings) {
      try {
        await settingService.bulkUpdateSettings(settings);
        // 更新后重新加载所有设置
        await dispatch('loadAllSettings');
        return { success: true };
      } catch (error) {
        console.error('批量更新设置失败:', error);
        return { success: false, error };
      }
    }
  },

  getters: {
    // 获取特定组的设置
    getSettingsByGroup: (state) => (group) => {
      if (!state.settings) return [];
      return state.settings[group] || [];
    },

    // 获取单个设置值
    getSetting: (state) => (key, defaultValue = null) => {
      if (!state.settings) return defaultValue;
      
      // 遍历所有组查找设置
      for (const group in state.settings) {
        const setting = state.settings[group]?.find(s => s.key === key);
        if (setting) return setting.value;
      }
      
      return defaultValue;
    },

    // 检查设置是否已加载
    isLoaded: (state) => state.loaded,
    
    // 设置是否正在加载
    isLoading: (state) => state.loading,
    
    // 获取错误信息
    getError: (state) => state.error
  }
};
