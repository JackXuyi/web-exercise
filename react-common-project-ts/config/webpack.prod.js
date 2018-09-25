const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); // 精简输出
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const config = require("./webpack.config.js");

module.exports = merge(config, {
  mode: "production", // 生产环境
  plugins: [
    new BundleAnalyzerPlugin(),
    new UglifyJSPlugin({
      sourceMap: false // 调试
    })
  ]
});
