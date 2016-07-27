import constants from '../constants';

function localStorage(state = null, action) {
    const { type, payload } = action;

    if (type === constants.LOAD_STATE_FROM_LOCALSTORAGE) {
        return Object.assign({}, state, payload);
    }

    return state;
}

export default localStorage;