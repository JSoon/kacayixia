import constants from '../constants';

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

function likePhoto(id) {
    return {
        type: constants.LIKE_PHOTO,
        id: id
    }
}

function dislikePhoto(id) {
    return {
        type: constants.DISLIKE_PHOTO,
        id: id
    }
}

export {
requestPhotos,
receivePhotos,
fetchPhotos,

likePhoto,
dislikePhoto
}