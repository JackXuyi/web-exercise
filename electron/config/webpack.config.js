const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')

const { isDev } = require('./utils')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '.',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  //   plugins: [new HtmlWebpackPlugin({ filename: 'index.html', inject: 'head' })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
