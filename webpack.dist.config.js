'use strict';
var path = require("path");
var webpack = require('webpack');

module.exports = {

  output: {
      path: path.join(__dirname, 'dist'),
      filename: 'react-d3-chart.min.js',
      publicPath: 'dist/'
  },

  cache: true,
  entry: [
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
        exclude: [/node_modules/],
        loader: 'eslint!jsx'
    }]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]

};
