import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    publicPath: './', // 配置根目录
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录（js,css,image）
    open: true, // 是否启动打开浏览器
    host: '0.0.0.0', // 主机，0.0.0.0支持局域网地址，可以用真机测试
    port: 8082, // 端口
    // 代理配置
    proxy: {
      '/api': {
        // target: 'http://192.168.2.45:8080/api/', // 测试
        target: 'http://192.168.2.28:8081/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/oss': {
        target: 'https://cancer-research.oss-cn-beijing.aliyuncs.com/', // 目标接口域名
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/oss/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // '@': `${pathSrc}/`,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ]
    }),
  ]
})
