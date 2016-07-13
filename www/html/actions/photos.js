import constants from '../constants';

// 获取照片列表
function requestPhotos(p) {
    return {
        type: constants.REQUEST_PHOTOS,
        page: p
    }
}

function receivePhotos(json) {
    return {
        type: constants.RECEIVE_PHOTOS,
        photos: json,
        receivedAt: Date.now()
    }
}

function fetchPhotos(p = 1) {
    return dispatch => {
        dispatch(requestPhotos(p));
        return $.ajax({
            url: 'data/photos.json',
            data: {
                page: p
            }
        }).done((json) => dispatch(receivePhotos(json)))
    }
}

// 照片点赞
function requestLikePhoto(index) {
    return {
        type: constants.REQUEST_LIKE_PHOTO,
        index
    }
}

function receiveLikePhoto(index) {
    return {
        type: constants.RECEIVE_LIKE_PHOTO,
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