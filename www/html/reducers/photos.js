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
        case constants.LIKE_PHOTO:
            let photos = state.items.slice();
            photos.map((item, index) => {
                if (action.id === item.id) {
                    item.like = item.like ? false : true;
                }
            });
            return Object.assign({}, state, {
                items: photos
            });
        default:
            return state;
    }
};

export default photos;