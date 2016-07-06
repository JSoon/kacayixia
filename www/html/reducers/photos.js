import constants from '../constants';
import Update from 'react-addons-update'; // Deep copy

const initialState = {
    isFetching: false,
    pageCount: 0,
    curPage: 0,
    prevPageUrl: '',
    nextPageUrl: '',
    items: []
}

const photos = (state = initialState, action) => {
    let index = action.index; // 点赞照片索引号

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
        case constants.REQUEST_LIKE_PHOTO:
            return state;
        case constants.RECEIVE_LIKE_PHOTO:
            let newItems = {};
            newItems[index] = {
                like: { $set: !state.items[index].like }
            };
            let photos = Update(state.items, newItems);
            return Object.assign({}, state, {
                items: photos
            });
        default:
            return state;
    }
};

export default photos;