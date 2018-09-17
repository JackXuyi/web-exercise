const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const config = require("../package.json");

const rootPath = path.resolve(__dirname, "../");

module.exports = {
  entry: path.join(rootPath, "./src/index.js"),
  plugins: [
    new CleanWebpackPlugin([path.join(rootPath, "./dist")]), // 清理数据
    new HtmlWebpackPlugin({
      // 自动打包数据
      title: config.title,
      favicon: config.favicon,
      template: path.join(rootPath, "./src/index.html") // html文件模板
    })
  ],
  output: {
    filename: "[name].[hash].bundle.js", // 输出文件名称
    path: path.join(rootPath, "./dist") // 输出文件路径
  },
  resolve: {
    alias: {
      assets: path.join(rootPath, "./src/assets"),
      components: path.join(rootPath, "./src/components"),
      container: path.join(rootPath, "./src/container"),
      pages: path.join(rootPath, "./src/pages"),
      modules: path.join(rootPath, "./src/redux/modules"),
      styles: path.join(rootPath, "./src/styles"),
      utils: path.join(rootPath, "./src/utils")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //配置要处理的文件格式，一般使用正则表达式匹配
        use: ["thread-loader", "babel-loader"], //使用的加载器名称
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["thread-loader", "style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "thread-loader"
          },
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              modifyVars: config.theme || {},
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "thread-loader"
          },
          {
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: ["thread-loader", "svg-inline-loader"]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "thread-loader"
          },
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  }
};
