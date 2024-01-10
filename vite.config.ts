import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true, // 是否启动打开浏览器
    host: '0.0.0.0', // 主机，0.0.0.0支持局域网地址，可以用真机测试
    port: 8081, // 端口
    // 代理配置
    proxy: {
      '/api': {
        target: 'http://192.168.2.45:8080/api/', // 测试
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/tumor': {
        target: 'http://192.168.2.45:8080/tumor/', // 测试
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tumor/, '')
      },
      '/oss': {
        target: 'https://cancer-research.oss-cn-beijing.aliyuncs.com/', // 目标接口域名
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/oss/, '')
      }
    }
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
