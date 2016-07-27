import constants from '../constants';

function user(state = null, action) {
    switch (action.type) {
        case constants.RECEIVE_USER:
            return Object.assign({}, state, action.user);
        case constants.RECEIVE_LOGOUT:
            return null;
        default:
            return state;
    }
}

export default user;