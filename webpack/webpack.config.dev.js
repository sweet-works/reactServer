const path = require('path')
const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[chunkHash:5].js',
        path: path.join(__dirname, '../build'),
    },
}
module.exports = config;