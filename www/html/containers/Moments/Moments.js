import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchPhotos,
    fetchLikePhoto
} from '../../actions/photos';
import Update from 'react-addons-update';
import Photos from '../../components/Photos/Photos';
import './Moments.less';

class Moments extends Component {
    constructor(props) {
        super(props);
        // When creating callbacks in JavaScript, you usually need to explicitly bind a method to
        // its instance such that the value of this is correct.
        // With React, every method is automatically bound to its component instance
        // (except when using ES6 class syntax).
        // Reference: https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html
        this.onLikeClick = this.onLikeClick.bind(this);
    }

    componentDidMount() {
        let {
            dispatch,
            routerLocation
        } = this.props;
        let page = parseInt(routerLocation.query.p);
        this.fetchPhotos = dispatch(fetchPhotos(page)); // return a promise
    }

    componentWillReceiveProps(nextProps) {
        let {
            dispatch,
            routerLocation
        } = this.props;
        // 因为 router 会改变 component 的 props，所以破坏了 react 原生态中的周期函数行为
        // 导致 componentWillReceiveProps 在 initial render 阶段被触发
        // 故而这里需要从 storeState 中取出实质改变后的 routerLocation 来进行判断
        // 避免出现无限循环的 dispatch
        // Reference: https://github.com/reactjs/redux/issues/227
        if (routerLocation.pathname === nextProps.routerLocation.pathname &&
            routerLocation.query !== nextProps.routerLocation.query) {
            let newPage = parseInt(nextProps.routerLocation.query.p);
            dispatch(fetchPhotos(newPage));
        }
    }

    componentWillUnmount() {
        this.fetchPhotos.abort();
    }

    // 照片点赞
    onLikeClick(e, id, index) {
        e.preventDefault();
        let {dispatch} = this.props;
        dispatch(fetchLikePhoto(id, index));
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
    let {
        routerLocation
    } = state;
    return {
        pageCount,
        curPage,
        prevPageUrl,
        nextPageUrl,
        photos: items,
        routerLocation
    }
}

export default connect(mapStateToProps)(Moments);