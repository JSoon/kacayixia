import constants from '../constants';

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
    const { type, error } = action;

    if (type === constants.RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return action.error;
    }

    return state;
}

export default errorMessage;