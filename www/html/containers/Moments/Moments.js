import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPhotos} from '../../actions/photos';
import Photos from '../../components/Photos/Photos';
import './Moments.less';

class Moments extends Component {
    componentDidMount() {
        let {dispatch} = this.props;
        dispatch(fetchPhotos());
    }

    render() {
        return (
            <div className="moments-tree">
                <main className="trunk">
                    <Photos
                        { ...this.props }
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