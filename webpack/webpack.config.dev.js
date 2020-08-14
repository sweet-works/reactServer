/*
 * @Autor: yaojie
 * @Date: 2020-08-13 14:47:01
 * @LastEditors: yaojie
 * @LastEditTime: 2020-08-14 15:57:23
 * @Description: pu
 */
const path = require('path')
const config = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[chunkHash:5].js',
        path: path.join(__dirname, '../dis'),
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
    }
}
module.exports = config;