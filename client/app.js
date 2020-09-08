/*
 * @Autor: yaojie
 * @Date: 2020-08-14 14:17:29
 * @LastEditors: yaojie
 * @LastEditTime: 2020-09-08 14:22:59
 * @Description: '配置react 入口文件'
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './commponents/App.jsx'
import { AppContainer } from 'react-hot-loader';

const Render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("root")
    )
}
Render(App)
// ReactDOM.render(<App />, document.getElementById("root"))
if (module.hot) {
    module.hot.accept('./commponents/App.jsx', () => {
        const nextApp = require('./commponents/App.jsx').default;
        // ReactDOM.render(<nextApp />, document.getElementById("root"))
        Render(nextApp)
    })
}