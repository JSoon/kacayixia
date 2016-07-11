import {combineReducers} from 'redux';
import dailyPhoto from './dailyPhoto';
import photos from './photos';
import routerLocation from './routerLocation';
import errorMessage from './errorMessage';

const rootReducers = combineReducers({
    dailyPhoto,
    photos,
    routerLocation,
    errorMessage
});

export default rootReducers;