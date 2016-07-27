import constants from '../constants';

function localStorageLoadMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        const {type} = action;
        if (type === constants.INIT_STATE_FROM_LOCALSTORAGE) {
            const storedState = JSON.parse(localStorage.getItem('kacayixia'));
            console.log('loadStoredState', storedState);
            // if (storedState) {
            //     dispatch({
            //         type: constants.LOAD_STATE_FROM_LOCALSTORAGE,
            //         payload: storedState
            //     });
            // }
        }
        next(action);
    };
}

const localStorageLoad = localStorageLoadMiddleware();

export default localStorageLoad;
