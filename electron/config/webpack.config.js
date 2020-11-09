const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { isDev } = require('./utils')

const outputPath = path.resolve(__dirname, '../dist')

module.exports = {
  target: 'electron-main',
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: outputPath,
    publicPath: '/',
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: path.resolve(__dirname, '../dist'),
    }),
    // new CleanWebpackPlugin([outputPath]),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../index.html'),
    //     to: path.resolve(outputPath, './index.html'),
    //   },
    // ]),
    // new HtmlWebpackPlugin({ filename: 'index.html', inject: 'head' }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
