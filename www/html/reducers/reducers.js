import {combineReducers} from 'redux';
import dailyPhoto from './dailyPhoto';
import photos from './photos';
import routerLocation from './routerLocation';

const rootReducers = combineReducers({
    dailyPhoto,
    photos,
    routerLocation
});

export default rootReducers;