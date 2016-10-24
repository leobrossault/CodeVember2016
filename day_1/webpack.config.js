var entryDirectory = './app/';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    entryDirectory + 'scripts/index.js',
    entryDirectory + 'styles/main.scss'
  ],
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\s[a|c]ss$/,
        exclude: /node_modules/,
        loader: 'sasslint'
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
      }
    ]
  },
  debug: true
};
