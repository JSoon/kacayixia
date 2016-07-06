import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Router, hashHistory} from 'react-router';
import routeConfig from './routes';
import {routerLocationDidUpdate} from './actions/routerLocation';

// 监听 History，将 location 信息放入 store 中进行 subscribe，从而确保
// storeState 总是与 router state 同步
hashHistory.listen(location => store.dispatch(routerLocationDidUpdate(location)));

render(
    <Provider store={store}>
        <Router routes={routeConfig} history={hashHistory} />
    </Provider>,
    document.getElementById('J_App')
)