const Pacth = 'http://localhost:8888/public/index.html';
const axios = require('axios');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
let {createProxyMiddleware} = proxy;
const memoryFs = require('memory-fs');
const path = require('path');
const serverConfig = require('../../webpack/webpack.server');
const ReactDomServer = require('react-dom/server');
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get(Pacth).then(res => {
            resolve(res.data);
        }).catch(reject);
    })
}

const serverCompiler = webpack(serverConfig);
const mfs = new memoryFs;
const Module = module.constructor;

serverCompiler.outputFileSystem= mfs;
let serverBundel;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(war => console.warn(war));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename,
    );
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const m = new Module();
    m._compile(bundle, 'server-app.js');
    serverBundel = m.exports.default;
})
module.exports = function (app) {
    // 代理
    if (proxy) {
        app.use('/public', createProxyMiddleware({
            target: 'http://localhost:8888'
        }));
    }

    app.get('*', (req, res) => {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundel);
            let newApp = template.replace('<app></app>', content)
            res.send(newApp);
        })
    })

}