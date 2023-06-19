const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  //不过，对所有的依赖都进行转译可能会降低构建速度
  transpileDependencies: false,
  // 服务器配置
  devServer:{
    // 自动打开浏览器
    // open:true,
    // 主机地址(1.localhost 2.127.0.0.1 3.本地ip)
    host:' 192.168.16.48',
    // 端口号(0---65535,1-1023是系统端口号,1024-5000属于应用端口号)
    port:8888
  }
})
