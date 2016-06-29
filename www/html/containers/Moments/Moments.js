import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchPhotos,
    likePhoto,
    dislikePhoto
} from '../../actions/photos';
import Photos from '../../components/Photos/Photos';
import './Moments.less';

class Moments extends Component {
    constructor(props) {
        super(props);
        // When creating callbacks in JavaScript, you usually need to explicitly bind a method to
        // its instance such that the value of this is correct.
        // With React, every method is automatically bound to its component instance
        // (except when using ES6 class syntax).
        // https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html
        this.onLikeClick = this.onLikeClick.bind(this);
    }

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(fetchPhotos());
    }

    onLikeClick(e, id) {
        e.preventDefault();
        let {dispatch} = this.props;
        dispatch(likePhoto(id));
    }

    render() {
        return (
            <div className="moments-tree">
                <main className="trunk">
                    <Photos
                        { ...this.props }
                        onLikeClick={this.onLikeClick}
                        />
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {
        pageCount,
        curPage,
        prevPageUrl,
        nextPageUrl,
        items
    } = state.photos;
    return {
        pageCount,
        curPage,
        prevPageUrl,
        nextPageUrl,
        photos: items
    }
}

export default connect(mapStateToProps)(Moments);