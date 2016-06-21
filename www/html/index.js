import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Router, hashHistory} from 'react-router';
import routeConfig from './routes';

render(
    <Provider store={store}>
        <Router routes={routeConfig} history={hashHistory}>
        </Router>
    </Provider>,
    document.getElementById('J_App')
)