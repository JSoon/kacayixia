import constants from '../constants';

function resetErrorMessage() {
    return {
        type: constants.RESET_ERROR_MESSAGE
    }
}

function ajaxErrorMessage(error) {
    return {
        type: constants.ERROR_MESSAGE,
        error: error.responseText + ' ' + error.status + ' ' + error.statusText
    }
}

export {
resetErrorMessage,
ajaxErrorMessage
}