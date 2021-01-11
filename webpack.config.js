const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
  const loaders = ['babel-loader'];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'src'), // FOR HOT RELOAD STYLE
    watchContentBase: true, // FOR HOT RELOAD STYLE
    port: 3000,
    hot: isDev,
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'], // /default load file
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd, // /set html pack
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}), // /clear dist to hash
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }), // / create copy dir or file in dist
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};
