const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); // 精简输出
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "production", // 生产环境
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true // 调试
    })
  ]
});
