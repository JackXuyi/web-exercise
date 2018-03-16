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
    contentBase: './dist', // 编译后文件路径
    hot: true, // 是否开启热替换
    host: 'localhost' // 主机
  }
});