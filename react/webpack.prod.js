const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');// 精简输出
const config = require('./webpack.config.js');

module.exports = merge(config, {
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true // 调试
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') // 定义生产模式
    })
  ]
});