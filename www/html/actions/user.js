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
            localStorage.setItem('unick', json.name);
            localStorage.setItem('uavatar', json.avatar);
            dispatch(receiveUser(json));
        });
    }
}

export {
requestUser,
receiveUser,
fetchUser
}