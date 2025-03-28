import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/main.css'

// 设置API基础URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// 创建应用实例
const app = createApp(App)

// 注册组件和插件
app.use(router)
app.use(store)

// 尝试自动登录
store.dispatch('auth/autoLogin');

// 挂载应用
app.mount('#app')
