/*
 * @Autor: yaojie
 * @Date: 2020-08-14 16:48:47
 * @LastEditors: yaojie
 * @LastEditTime: 2020-08-17 10:33:20
 * @Description: 
 */
const Koa = require('koa');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server-app');
const app = new Koa();
var router = new Router();
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
app.use('/public', KoaStatic(path.join(__dirname, '../dist')));
app.use(async ctx => {
    const appString = ReactSSR.renderToString(serverEntry.default);
    let newApp = template.replace('<app></app>', appString)
    ctx.body = newApp;
});
const prot = 3001;
app.listen(prot, () => {
    console.log(`http://localhost:${prot}`)
})