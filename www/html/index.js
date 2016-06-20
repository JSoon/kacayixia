import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Router, hashHistory} from 'react-router';
import routes from './routes';

render(
    <Provider store={store}>
        <Router routes={routes} history={hashHistory}>
        </Router>
    </Provider>,
    document.getElementById('J_App')
)