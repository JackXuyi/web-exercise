const { merge } = require('webpack-merge')
const webpack = require('webpack')

const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
})
