import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    // applyMiddleware(
    //     thunkMiddleware,
    //     loggerMiddleware
    // )
);

export default store;