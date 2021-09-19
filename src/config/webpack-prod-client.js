// Webpack config for creating the production bundle.
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const paths = require('./paths');
const webpackBaseConfig = require('./webpack');

module.exports = {
  ...webpackBaseConfig,
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: [paths.kickstarterClientEntry],
  },
  output: {
    path: paths.appAssets,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  plugins: [
    // clean old dist files
    new CleanWebpackPlugin(),

    // css files from the extract-text-plugin loader
    new MiniCssExtractPlugin({
      filename: '[name]-[chunkhash].css',
    }),

    // polyfill node modules
    new NodePolyfillPlugin(),

    // define process.env constants
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      APP_MODE: 'production',
      APP_ENV: 'client',
      APP_PLATFORM: 'web',
    }),

    new WebpackManifestPlugin({
      fileName: paths.webpackManifest,
    }),
  ],
};