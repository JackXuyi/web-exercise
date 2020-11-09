const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      //   inject: 'body',
    }),
  ],
})
