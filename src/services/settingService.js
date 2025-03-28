import axios from 'axios';

/**
 * 站点设置服务
 * 用于获取和管理站点设置
 */
export default {
  /**
   * 获取所有公开设置
   */
  async getPublicSettings() {
    try {
      const response = await axios.get('/api/settings/public?public=true');
      return response;
    } catch (error) {
      console.error('获取公开设置失败', error);
      throw error;
    }
  },

  /**
   * 获取所有设置（管理员）
   */
  async getAllSettings() {
    try {
      const response = await axios.get('/api/settings');
      return response;
    } catch (error) {
      console.error('获取所有设置失败', error);
      throw error;
    }
  },

  /**
   * 获取单个设置
   * @param {string} key - 设置键名
   */
  async getSetting(key) {
    try {
      const response = await axios.get(`/api/settings/${key}`);
      return response.data.data;
    } catch (error) {
      console.error(`获取设置 ${key} 失败`, error);
      throw error;
    }
  },

  /**
   * 更新设置
   * @param {string} key - 设置键名
   * @param {object} data - 设置数据
   */
  async updateSetting(key, data) {
    try {
      const response = await axios.put(`/api/settings/${key}`, data);
      return response.data;
    } catch (error) {
      console.error(`更新设置 ${key} 失败`, error);
      throw error;
    }
  },

  /**
   * 批量更新设置
   * @param {Array} settings - 设置数组
   */
  async bulkUpdateSettings(settings) {
    try {
      const response = await axios.post('/api/settings/bulk', { settings });
      return response.data;
    } catch (error) {
      console.error('批量更新设置失败', error);
      throw error;
    }
  },

  /**
   * 删除设置
   * @param {string} key - 设置键名
   */
  async deleteSetting(key) {
    try {
      const response = await axios.delete(`/api/settings/${key}`);
      return response.data;
    } catch (error) {
      console.error(`删除设置 ${key} 失败`, error);
      throw error;
    }
  }
};
