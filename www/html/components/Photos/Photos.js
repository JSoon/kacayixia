import React, {PropTypes} from 'react';
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
                        photos.map((item, i) => {
                            if (item.pick) {
                                if (item.topPick) {
                                    return <div className="col-lg-8" key={item.id}>
                                        <PhotoItem
                                            topPick={item.topPick}
                                            photo={item.photo}
                                            photographer={item.photographer}
                                            />
                                    </div>
                                } else {
                                    return <div className="col-lg-4" key={item.id}>
                                        <PhotoItem
                                            topPick={item.topPick}
                                            photo={item.photo}
                                            photographer={item.photographer}
                                            />
                                    </div>
                                }
                            }
                        })
                    }
                </div>
                <div className="row">
                    {
                        photos.map((item, i) => {
                            if (!item.pick) {
                                return <div className="col-lg-4" key={item.id}>
                                    <PhotoItem
                                        topPick={item.topPick}
                                        photo={item.photo}
                                        photographer={item.photographer}
                                        />
                                </div>
                            }
                        })
                    }
                </div>
            </div>
            <div className="pagination">
                <a className="prev btn" href="#" title="上一页">
                    <i className="sj sj-arrow-l clear-trans"></i>
                </a>
                <a className="next btn" href="#" title="下一页">
                    <i className="sj sj-arrow-r clear-trans"></i>
                </a>
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