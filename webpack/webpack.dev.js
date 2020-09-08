/*
 * @Autor: yaojie
 * @Date: 2020-08-13 14:47:01
 * @LastEditors: yaojie
 * @LastEditTime: 2020-09-08 14:28:32
 * @Description: pu
 */
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const config = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public', // 引入时会以这个开头
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.png',
            '.gif',
            '.jpg',
            '.ico',
            '.scss',
            '.css'
        ],
        alias: {
            '@client': path.resolve(__dirname, '../client'),
            '@server': path.resolve(__dirname, '../server')
        }
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../views/template.html')
        })
    ]
}
if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

}
module.exports = config;