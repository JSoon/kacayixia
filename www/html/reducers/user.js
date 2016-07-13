import constants from '../constants';

function user(state = null, action) {
    if (action.type === constants.RECEIVE_USER) {
        return Object.assign({}, state, action.user);
    }
    return state;
}

export default user;