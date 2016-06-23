import constants from '../constants';

const initialState = {
    isFetching: false,
    photo: {},
    photographer: {}
}

const dailyPhoto = (state = initialState, action) => {
    switch (action.type) {
        case constants.REQUEST_DAILYPHOTO:
            return Object.assign({}, state, {
                isFetching: true
            });
        case constants.RECEIVE_DAILYPHOTO:
            return Object.assign({}, state, action.json, {
                isFetching: false,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

export default dailyPhoto;