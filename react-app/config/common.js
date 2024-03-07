const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
// const isDev = process.env.NODE_ENV === 'dev'
// console.log({ isDev });
const config = {
    entry: resolve(__dirname, '../src/index.tsx'),
    output: {
        path: resolve(__dirname, '../dist'),
        // filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[contenthash].js'
        filename: 'static/js/[name].[contenthash].js'

    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'my react',
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new WebpackBar(),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }

}


module.exports = config