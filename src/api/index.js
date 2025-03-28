import axios from 'axios';

// 创建axios实例
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// 请求拦截器 - 添加token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理常见错误
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 处理401错误 - 未授权/token过期
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // 如果在管理后台页面，重定向到登录页
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// 产品API
const productApi = {
  // 获取所有产品
  getProducts: () => apiClient.get('/products'),
  
  // 获取单个产品详情
  getProductBySlug: (slug) => apiClient.get(`/products/${slug}`),
  
  // 创建产品
  createProduct: (productData) => apiClient.post('/products', productData),
  
  // 更新产品
  updateProduct: (id, productData) => apiClient.put(`/products/${id}`, productData),
  
  // 删除产品
  deleteProduct: (id) => apiClient.delete(`/products/${id}`)
};

// 解决方案API
const solutionApi = {
  // 获取所有解决方案
  getSolutions: () => apiClient.get('/solutions'),
  
  // 获取单个解决方案详情
  getSolutionBySlug: (slug) => apiClient.get(`/solutions/${slug}`),
  
  // 按行业获取解决方案
  getSolutionsByIndustry: (industry) => apiClient.get(`/solutions/industry/${industry}`),
  
  // 创建解决方案
  createSolution: (solutionData) => apiClient.post('/solutions', solutionData),
  
  // 更新解决方案
  updateSolution: (id, solutionData) => apiClient.put(`/solutions/${id}`, solutionData),
  
  // 删除解决方案
  deleteSolution: (id) => apiClient.delete(`/solutions/${id}`)
};

// 联系表单API
const contactApi = {
  // 提交联系表单
  submitContact: (contactData) => apiClient.post('/contacts', contactData),
  
  // 获取所有联系表单记录
  getContacts: (params) => apiClient.get('/contacts', { params }),
  
  // 获取单个联系表单详情
  getContactById: (id) => apiClient.get(`/contacts/${id}`),
  
  // 更新联系表单状态
  updateContactStatus: (id, statusData) => apiClient.patch(`/contacts/${id}/status`, statusData)
};

// 认证API
const authApi = {
  // 用户登录
  login: (credentials) => apiClient.post('/auth/login', credentials),
  
  // 获取当前用户信息
  getMe: () => apiClient.get('/auth/me'),
  
  // 注册新用户
  register: (userData) => apiClient.post('/auth/register', userData),
  
  // 更新用户信息
  updateUser: (userData) => apiClient.put('/auth/update', userData),
  
  // 更新密码
  updatePassword: (passwordData) => apiClient.put('/auth/password', passwordData)
};

// 用户管理API
const userApi = {
  // 获取所有用户
  getUsers: () => apiClient.get('/users'),
  
  // 获取单个用户详情
  getUserById: (id) => apiClient.get(`/users/${id}`),
  
  // 获取当前登录用户信息
  getCurrentUser: () => apiClient.get('/auth/me'),
  
  // 创建用户
  createUser: (userData) => apiClient.post('/users', userData),
  
  // 更新用户
  updateUser: (id, userData) => apiClient.put(`/users/${id}`, userData),
  
  // 删除用户
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
  
  // 重置用户密码
  resetPassword: (id, passwordData) => apiClient.post(`/users/${id}/reset-password`, passwordData)
};

// 设置API
const settingService = {
  // 获取所有设置项
  getAllSettings: (query = '') => apiClient.get(`/settings${query}`),
  
  // 获取单个设置项
  getSetting: (key) => apiClient.get(`/settings/${key}`),
  
  // 更新设置项
  updateSetting: (key, value) => apiClient.put(`/settings/${key}`, { value }),
  
  // 批量更新设置项
  updateSettings: (settings) => apiClient.post('/settings/bulk', { settings })
};

export default {
  product: productApi,
  solution: solutionApi,
  contact: contactApi,
  auth: authApi,
  user: userApi,
  setting: settingService
};

// 单独导出各个API服务
export { 
  productApi, 
  solutionApi, 
  contactApi, 
  authApi, 
  userApi, 
  settingService 
};
