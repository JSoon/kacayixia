import constants from '../constants';

function localStorageSaveMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        next(action);
        // if (action.type !== constants.ROUTER_LOCATION_DID_UPDATE) {
        localStorage.setItem('kacayixia', JSON.stringify(getState()));
        console.log('after', localStorage.getItem('kacayixia'));
        // }
    };
}

const localStorageSave = localStorageSaveMiddleware();

export default localStorageSave;
