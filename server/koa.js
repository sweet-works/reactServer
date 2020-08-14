/*
 * @Autor: yaojie
 * @Date: 2020-08-14 16:48:47
 * @LastEditors: yaojie
 * @LastEditTime: 2020-08-14 17:48:53
 * @Description: 
 */
const Koa = require('koa');
const ReactSSR = require('react-dom/server');
const serverEntry = require('../dist/server-app');
const app = new Koa();
app.use(async ctx => {
    const appString = ReactSSR.renderToString(serverEntry.default);
    ctx.body = appString;
});

app.listen(3000, () => {
    console.log(`http://localhost:${3000}`)
})