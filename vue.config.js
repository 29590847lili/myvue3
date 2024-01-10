import { fileURLToPath, URL } from 'node:url'
module.exports = {
  publicPath: './', // 配置根目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录（js,css,image）
  lintOnSave: 'default', // 'default' 是否开启eslint检测,false不开启，有效值：true || false || default
  productionSourceMap: false, // 生成环境下面开启sourceMap支持断点调试
  devServer: {
    open: true, // 是否启动打开浏览器
    host: '0.0.0.0', // 主机，0.0.0.0支持局域网地址，可以用真机测试
    port: 8081, // 端口
    https: false, // 是否启动https
    // 配置跨域代理http,https  http://192.168.100.149:40030/ 张林林本地
    proxy: {
      '/api': {
        target: 'http://192.168.2.45:8080/api/', // 测试
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/tumor': {
        target: 'http://192.168.2.45:8080/tumor/', // 测试
        changeOrigin: true,
        pathRewrite: {
          '^/tumor': ''
        }
      },
      '/wx': {
        target: 'https://mp.weixin.qq.com/', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/wx': '' // 重写接口,后面可以使重写的新路径，一般不做更改
        }
      },
      '/oss': {
        target: 'https://cancer-research.oss-cn-beijing.aliyuncs.com/', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/oss': '' // 重写接口,后面可以使重写的新路径，一般不做更改
        }
      }
    }
  }
}
