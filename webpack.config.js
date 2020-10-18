const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'main[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'], ///default load file
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new CleanWebpackPlugin(),///clear dist to hash
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.jpg'),
                    to:  path.resolve(__dirname, 'dist/assets')
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'main[hash].js'
        })
    ]
};
