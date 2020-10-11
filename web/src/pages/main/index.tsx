import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from "./views/router";
import { loadGlobalVar } from '@static/common/global';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { initStore } from '@lwRedux/store/index';

let store = initStore();
//加载全局变量
loadGlobalVar();
function rooterRender() {
    render(
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <Router />
            </ConfigProvider>
        </Provider>,
        document.getElementById('App')
    );
}
rooterRender();

