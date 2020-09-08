/*
 * @Autor: yaojie
 * @Date: 2020-08-13 14:47:01
 * @LastEditors: yaojie
 * @LastEditTime: 2020-09-08 17:21:42
 * @Description: pu
 */
const path = require('path');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
const config = {
    target: 'node',
    mode: 'development',
    entry: {
        app: path.join(__dirname, '../client/server-app.js')
    },
    output: {
        filename: 'server-app.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public', // 引入时会以这个开头
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}

module.exports = config;