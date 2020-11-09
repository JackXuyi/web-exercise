const { merge } = require('webpack-merge')
const path = require('path')

const config = require('./webpack.dev.config')

module.exports = merge(config, {
  watch: true,
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 3000,
    // color: true,
    disableHostCheck: true,
    hot: true,
  },
})
