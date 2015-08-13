'use strict';
var path = require("path");
var webpack = require('webpack');

module.exports = {

  output: {
      path: path.join(__dirname, 'src'),
      filename: 'react-d3-chart.min.js',
      publicPath: 'src/'
  },

  cache: true,
  entry: [
      'webpack/hot/only-dev-server',
      './src/components/App.jsx'
  ],

  stats: {
      colors: true,
      reasons: true
  },

  resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
          'components': __dirname + '/src/components/',
          'module': __dirname + '/src/components/module/'
      }
  },
  module: {
    loaders: [{
        test: /.jsx$/,
        exclude: /node_modules/,
        loader: 'jsxhint!react-hot'
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
