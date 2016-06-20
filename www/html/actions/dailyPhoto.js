import constants from '../constants';

function fetchDailyPhoto() {
    return dispatch => {
        return $.ajax('data/dailyPhoto.json')
            .done((json) => dispatch(receiveDailyPhoto(json)))
            .fail((err) => console.log(err))
    }
}

function receiveDailyPhoto(json) {
    return {
        type: constants.RECEIVE_DAILYPHOTO,
        json: json,
        receivedAt: Date.now()
    }
}

export {
fetchDailyPhoto,
receiveDailyPhoto
}