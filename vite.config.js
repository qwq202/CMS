import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    // 生产环境移除console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 分离css文件
    cssCodeSplit: true,
    // 小于此阈值的资源将被内联为base64编码
    assetsInlineLimit: 4096,
    // 启用gzip压缩
    brotliSize: true,
    // 分块策略
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vuex'],
          ui: ['@headlessui/vue', '@heroicons/vue'],
        }
      }
    }
  }
})
