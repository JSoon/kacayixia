import constants from '../constants';

function requestDailyPhoto() {
    return {
        type: constants.REQUEST_DAILYPHOTO
    }
}

function receiveDailyPhoto(json) {
    return {
        type: constants.RECEIVE_DAILYPHOTO,
        json: json,
        receivedAt: Date.now()
    }
}

function fetchDailyPhoto() {
    return dispatch => {
        dispatch(requestDailyPhoto());
        return $.ajax('data/dailyPhoto.json')
            .done((json) => dispatch(receiveDailyPhoto(json)))
            .fail((err) => console.log(err))
    }
}

export {
requestDailyPhoto,
receiveDailyPhoto,
fetchDailyPhoto
}