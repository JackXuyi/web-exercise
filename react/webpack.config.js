const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']), // 清理数据
    new HtmlWebpackPlugin({
      // 自动打包数据
      title: '测试',
      filename: 'index.html',
      template: 'src/index.html', // html文件模板
      favicon: 'src/assets/images/favicon.jpg',
    }),
  ],
  output: {
    filename: '[name].[hash].bundle.js', // 输出文件名称
    path: path.resolve(__dirname, 'dist'), // 输出文件路径
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //配置要处理的文件格式，一般使用正则表达式匹配
        use: 'babel-loader', //使用的加载器名称
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-router': 'ReactRouter',
  },
}
