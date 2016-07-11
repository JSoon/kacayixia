import constants from '../constants';

function requestDailyPhoto() {
    return {
        type: constants.REQUEST_DAILY_PHOTO
    }
}

function receiveDailyPhoto(json) {
    return {
        type: constants.RECEIVE_DAILY_PHOTO,
        json: json,
        receivedAt: Date.now()
    }
}

function fetchDailyPhoto() {
    return dispatch => {
        dispatch(requestDailyPhoto());
        return $.ajax('data/dailyPhoto.json')
            .done((json) => dispatch(receiveDailyPhoto(json)))
    }
}

export {
requestDailyPhoto,
receiveDailyPhoto,
fetchDailyPhoto
}