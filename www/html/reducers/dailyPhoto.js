import constants from '../constants';

const dailyPhoto = (state = {
    photo: {},
    photographer: {}
}, action) => {
    switch (action.type) {
        case constants.RECEIVE_DAILYPHOTO:
            return Object.assign({}, state, action.json.dailyPhoto);
        default:
            return state;
    }
};

export default dailyPhoto;