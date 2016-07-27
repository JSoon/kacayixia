import {combineReducers} from 'redux';
import localStorage from './localStorage';
import dailyPhoto from './dailyPhoto';
import photos from './photos';
import routerLocation from './routerLocation';
import errorMessage from './errorMessage';
import user from './user';

const rootReducers = combineReducers({
    localStorage,
    dailyPhoto,
    photos,
    routerLocation,
    errorMessage,
    user
});

export default rootReducers;