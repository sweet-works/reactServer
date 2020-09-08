/*
 * @Autor: yaojie
 * @Date: 2020-08-14 16:48:47
 * @LastEditors: yaojie
 * @LastEditTime: 2020-09-08 16:00:10
 * @Description: 
 */
const express = require('express');
const ReactSSR = require('react-dom/server');
const app = express();
const fs = require('fs')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development';
if (!isDev) {
    const serverEntry = require('../dist/server-app.js');
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('*', (req, res) => {
        const appString = ReactSSR.renderToString(serverEntry.default);
        let newApp = template.replace('<app></app>', appString)
        res.send(newApp);
    })
} else {
    const devStatic = require('./util/dev-static');
    devStatic(app)
}
app.listen(3000, () => {
    console.log(`http://localhost:${3000}`)
})