const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  //不过，对所有的依赖都进行转译可能会降低构建速度
  transpileDependencies: false,

   lintOnSave: false, //关闭掉了脚手架的语法检查

  // 服务器配置
  devServer: {
    // 自动打开浏览器
    // open:true,
    // 主机地址(1.localhost 2.127.0.0.1 3.本地ip)
    host: 'localhost',
    // 端口号(0---65535,1-1023是系统端口号,1024-5000属于应用端口号)
    port: 8888,
    // 代理
    proxy: {
      '/dev-api1': {
        // 代理的目标地址
        target: 'http://gmall-h5-api.atguigu.cn/',
        // 是否代理
        changeOrigin: true,
        // 重写前缀
        pathRewrite: {
          '^/dev-api1': ''
        }
      }
    },
  },

  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    resolve: {
      // 路径别名配置(需要在jsconfig中额外再配置就会代码书写的提示)
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@comp': '@/components',
        '@api': '@/api',
        '@pages': '@/pages'
      }
    }
  }
})
