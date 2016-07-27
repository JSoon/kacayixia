import constants from '../constants';

function requestUser() {
    return {
        type: constants.REQUEST_USER
    }
}

function receiveUser(user) {
    return {
        type: constants.RECEIVE_USER,
        user
    }
}

function fetchUser(user) {
    return dispatch => {
        dispatch(requestUser());
        return $.ajax({
            url: 'data/user.json',
            data: {
                email: user.email,
                pwd: user.pwd
            }
        }).done((json) => {
            localStorage.setItem('uid', json.id);
            localStorage.setItem('unick', json.name);
            localStorage.setItem('uavatar', json.avatar);
            dispatch(receiveUser(json));
        });
    }
}

function requestLogout(user) {
    return {
        type: constants.REQUEST_LOGOUT,
        user
    }
}

function receiveLogout() {
    return {
        type: constants.RECEIVE_LOGOUT
    }
}

function fetchLogout(user) {
    return dispatch => {
        dispatch(requestLogout(user));
        // sending logout request
        localStorage.removeItem('uid');
        localStorage.removeItem('unick');
        localStorage.removeItem('uavatar');
        dispatch(receiveLogout());
    }
}


export {
requestUser,
receiveUser,
fetchUser,
requestLogout,
receiveLogout,
fetchLogout
}