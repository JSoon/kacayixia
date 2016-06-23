import {combineReducers} from 'redux';
import dailyPhoto from './dailyPhoto';
import photos from './photos';

const rootReducers = combineReducers({
    dailyPhoto,
    photos
});

export default rootReducers;