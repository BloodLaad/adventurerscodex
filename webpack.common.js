const path = require('path');
const webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      hash: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'images/sample-headshots',
        to: 'images/sample-headshots'
      }
    ]),
    new WebpackPwaManifest({
      name: 'MyAdventurersCodex',
      short_name: 'MyAC',
      description: 'Adventurers Codex as PWA',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/images/logo-full-circle.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
          src: path.resolve('src/images/logo-full-circle-icon-favicon.png'),
          size: '1024x1024' // you can also use the specifications pattern
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {  // for loading in css files
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      { // for loading in images
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
    dropbox: 'Dropbox',
    marked: 'marked',
    strophe: "Strophe"
  }
}
