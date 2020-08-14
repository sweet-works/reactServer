/*
 * @Autor: yaojie
 * @Date: 2020-08-14 16:48:47
 * @LastEditors: yaojie
 * @LastEditTime: 2020-08-14 17:10:58
 * @Description: 
 */
const express = require('express');
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-app.js') 
const app = express();
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
app.use('/public', express.static(path.join(__dirname, '../dist')))
app.get('*', (req,res) => {
    const appString = ReactSSR.renderToString(serverEntry.default);
    res.send(template.replace('<app></app>', appString));
})

app.listen(3000, () => {
    console.log(`http://localhost:${3000}`)
})