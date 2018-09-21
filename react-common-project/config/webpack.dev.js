const merge = require("webpack-merge");
const webpack = require("webpack");
const apiMocker = require("webpack-api-mocker");
const config = require("./webpack.config.js");
const path = require("path");

const rootPath = path.resolve(__dirname, "../");

module.exports = merge(config, {
  devtool: "inline-source-map", // 开发工具
  mode: "development", // 开发模式
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热替换
  ],
  devServer: {
    // 开发模式下服务器配置
    contentBase: "./dist", // 编译后文件路径
    hot: true, // 是否开启热替换
    host: "localhost", // 主机
    historyApiFallback: true,
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    before(app) {
      apiMocker(app, path.join(rootPath, "./mock/index.js"), {
        proxy: {
          "/v1/*": "http://127.0.0.1:8080"
        },
        changeHost: true
      });
    }
  }
});
