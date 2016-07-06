import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import PhotoItem from '../../components/PhotoItem/PhotoItem';

const Photos = props => {
    let {
        pageCount,
        curPage,
        prevPageUrl,
        nextPageUrl,
        photos
    } = props;

    return (
        <div className="container">
            <div className="moments-list">
                {/*editor-picks*/}
                <div className="row editor-picks">
                    {
                        photos.map((item, index) => {
                            if (item.pick) {
                                if (item.topPick) {
                                    return (
                                        <div className="col-lg-8" key={index}>
                                            <PhotoItem
                                                id={item.id}
                                                className="top-pick"
                                                photo={item.photo}
                                                photographer={item.photographer}
                                                like={item.like}
                                                onLikeClick={
                                                    (e) => props.onLikeClick(e, item.id, index)
                                                }
                                                />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="col-lg-4" key={index}>
                                            <PhotoItem
                                                id={item.id}
                                                photo={item.photo}
                                                photographer={item.photographer}
                                                like={item.like}
                                                onLikeClick={
                                                    (e) => props.onLikeClick(e, item.id, index)
                                                }
                                                />
                                        </div>
                                    );
                                }
                            }
                        })
                    }
                </div>
                <div className="row">
                    {
                        photos.map((item, index) => {
                            if (!item.pick) {
                                return (
                                    <div className="col-lg-4" key={index}>
                                        <PhotoItem
                                            id={item.id}
                                            photo={item.photo}
                                            photographer={item.photographer}
                                            like={item.like}
                                            onLikeClick={
                                                (e) => props.onLikeClick(e, item.id, index)
                                            }
                                            />
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>
            <div className="pagination">
                <Link className="prev btn" to={
                    {
                        pathname: '/moments',
                        query: {
                            p: 1
                        }
                    }
                } title="上一页">
                    <i className="sj sj-arrow-l clear-trans"></i>
                </Link>
                <Link className="next btn" to={
                    {
                        pathname: '/moments',
                        query: {
                            p: 2
                        }
                    }
                } title="下一页">
                    <i className="sj sj-arrow-r clear-trans"></i>
                </Link>
            </div>
        </div>
    );
};

Photos.propTypes = {
    pageCount: PropTypes.number.isRequired,
    curPage: PropTypes.number.isRequired,
    prevPageUrl: PropTypes.string.isRequired,
    nextPageUrl: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object)
};

export default Photos;