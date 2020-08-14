/*
 * @Autor: yaojie
 * @Date: 2020-08-13 14:47:01
 * @LastEditors: yaojie
 * @LastEditTime: 2020-08-14 17:24:42
 * @Description: pu
 */
const path = require('path');
const config = {
    target: 'node',
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
        ]
    }
}
module.exports = config;