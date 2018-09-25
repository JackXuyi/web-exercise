const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const config = require("../package.json");

const rootPath = path.resolve(__dirname, "../");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: path.join(rootPath, "./src/index.js")
  },
  output: {
    filename: "[name].bundle.js", // 输出文件名称
    path: path.join(rootPath, "./dist") // 输出文件路径
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([path.join(rootPath, "/dist")], {
      root: rootPath,
      verbose: true
    }), // 清理数据
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: path.join(
        rootPath,
        devMode ? "/[name].css" : "/[name].[hash].css"
      ),
      chunkFilename: path.join(
        rootPath,
        devMode ? "/[id].css" : "/[id].[hash].css"
      )
    }),
    new HtmlWebpackPlugin({
      // 自动打包数据
      title: config.title,
      favicon: config.favicon,
      template: path.join(rootPath, "./src/index.html") // html文件模板
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
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
        test: /\.(ts|tsx)$/, //配置要处理的文件格式，一般使用正则表达式匹配
        use: ["babel-loader", "awesome-typescript-loader"], //使用的加载器名称
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(js|jsx)$/, //配置要处理的文件格式，一般使用正则表达式匹配
        use: ["babel-loader"], //使用的加载器名称
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? "style-loader" : MiniCssExtractPlugin.loader // creates style nodes from JS strings
          },
          "css-loader", // translates CSS into CommonJS
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
            loader: "file-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: ["svg-inline-loader"]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
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
