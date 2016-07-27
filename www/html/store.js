import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import localStorageLoadMiddleware from './middlewares/localStorageLoad';
import localStorageSaveMiddleware from './middlewares/localStorageSave';
import rootReducer from './reducers/reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    {
        localStorage: 'hehe'
    },
    compose(
        applyMiddleware(
            localStorageLoadMiddleware,
            thunkMiddleware,
            localStorageSaveMiddleware,
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