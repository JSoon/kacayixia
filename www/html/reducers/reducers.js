import {combineReducers} from 'redux';
import dailyPhoto from './dailyPhoto';
import photos from './photos';
import routerLocation from './routerLocation';
import errorMessage from './errorMessage';
import user from './user';

const rootReducers = combineReducers({
    dailyPhoto,
    photos,
    routerLocation,
    errorMessage,
    user
});

export default rootReducers;