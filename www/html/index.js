import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Router, hashHistory} from 'react-router';
import routeConfig from './routes';
import {initStateFromLocalStorage} from './actions/localStorage';
import {routerLocationDidUpdate} from './actions/routerLocation';
import {ajaxErrorMessage} from './actions/errorMessage';

// 监听 History
hashHistory.listen(location => {
    // 将 location 信息放入 store 中进行 subscribe，从而确保 storeState 总是与 router state 同步
    store.dispatch(routerLocationDidUpdate(location));
});

// 监听 ajax 错误信息
$(document).ajaxError((event, jqxhr) => {
    store.dispatch(ajaxErrorMessage(jqxhr));
});

// 初始化从 localStorage 中读取缓存数据
store.dispatch(initStateFromLocalStorage());

render(
    <Provider store={store}>
        <Router routes={routeConfig} history={hashHistory} />
    </Provider>,
    document.getElementById('J_App')
);