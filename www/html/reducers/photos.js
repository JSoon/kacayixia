import constants from '../constants';

const initialState = {
    isFetching: false,
    pageCount: 0,
    curPage: 0,
    prevPageUrl: '',
    nextPageUrl: '',
    items: []
}

const photos = (state = initialState, action) => {
    switch (action.type) {
        case constants.REQUEST_PHOTOS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case constants.RECEIVE_PHOTOS:
            return Object.assign({}, state, action.photos, {
                isFetching: false,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

export default photos;