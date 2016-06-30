import constants from '../constants';

// 获取照片列表
function requestPhotos() {
    return {
        type: constants.REQUEST_PHOTOS
    }
}

function receivePhotos(json) {
    return {
        type: constants.RECEIVE_PHOTOS,
        photos: json,
        receivedAt: Date.now()
    }
}

function fetchPhotos() {
    return dispatch => {
        dispatch(requestPhotos());
        return $.ajax('data/photos.json')
            .done((json) => dispatch(receivePhotos(json)))
            .fail((err) => console.log(err))
    }
}

// 照片点赞
function requestLikePhoto(index) {
    return {
        type: constants.REQUEST_LIKEPHOTO,
        index
    }
}

function receiveLikePhoto(index) {
    return {
        type: constants.RECEIVE_LIKEPHOTO,
        index
    }
}

function fetchLikePhoto(id, index) {
    return (dispatch, getState) => {
        dispatch(requestLikePhoto(index));
        return setTimeout(function () {
            dispatch(receiveLikePhoto(index));
        }, 500);
    }
}

export {
requestPhotos,
receivePhotos,
fetchPhotos,

requestLikePhoto,
receiveLikePhoto,
fetchLikePhoto
}