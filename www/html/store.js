import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import localStorageLoadMiddleware from './middlewares/localStorageLoad';
import localStorageSaveMiddleware from './middlewares/localStorageSave';
import rootReducer from './reducers/reducers';

const loggerMiddleware = createLogger();

// 初始化时判断用户登录状态
let user = null;
if (localStorage.getItem('uid')) {
    user = {
        "id": localStorage.getItem('uid'),
        "name": localStorage.getItem('unick'),
        "email": localStorage.getItem('uemail'),
        "avatar": localStorage.getItem('uavatar')
    }
}

const store = createStore(
    rootReducer,
    {
        user: user
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