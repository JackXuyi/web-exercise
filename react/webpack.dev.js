const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./webpack.config.js');

module.exports = merge(config, {
  devtool: 'inline-source-map', // 开发工具
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热替换
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development') // 定义开发者模式
    })
  ],
  devServer: { // 开发模式下服务器配置
    contentBase: './dist', //设定webpack-dev-server的director根目录。如果不进行设定的话，默认是在当前目录下。
    hot: true, // 是否开启热替换
    host: 'localhost', // 主机
    quiet: true, //控制台中不输出打包的信息，开发中一般设置为false，进行 打印，这样查看错误比较方面
    // no-info: // 不显示任何信息
    // compress:  //开启gzip压缩
    // host <hostname/ip>: //设置ip
    port: 8000, //设置端口号，默认是:8080
    // inline: //webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,
    open: true, //启动命令，自动打开浏览器
    historyApiFallback: true,  //查看历史url
    // config 新的配置文件名 //使用新的配置文件打包
  }
});