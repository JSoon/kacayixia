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
                    <div className="col-lg-8">
                        {
                            photos.map((item, i) =>
                                <PhotoItem
                                    key={item.id}
                                    topPick={item.topPick}
                                    photo={item.photo}
                                    photographer={item.photographer}
                                    />
                            )
                        }
                        {/*<figure className="top-pick">
                                        <div className="photo">
                                            <a className="photo-link" href="moment-details.html">
                                                <img src="http://placekitten.com/g/800/1000"/>
                                            </a>
                                            <a className="photo-over" href="moment-details.html"><i className="sj sj-magnifier"></i></a>
                                        </div>
                                        <figcaption>
                                            <a className="avatar" href="#">
                                                <img src="https://placeimg.com/42/42/any/grayscale"/>Randy Ortiz
                                            </a>
                                            <a className="like J_Like sj sj-heart" href="#"></a>
                                        </figcaption>
                                    </figure>*/}
                    </div>
                    <div className="col-lg-4">
                        <figure>
                            <div className="photo">
                                <a className="photo-link" href="#">
                                    <img src="http://placekitten.com/g/410/312"/>
                                </a>
                                <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                            </div>
                            <figcaption>
                                <a className="avatar" href="#">
                                    <img src="https://placeimg.com/42/42/any/grayscale"/>Dylan Murphy
                                </a>
                                <a className="like J_Like sj sj-heart" href="#"></a>
                            </figcaption>
                        </figure>
                        <figure>
                            <div className="photo">
                                <a className="photo-link" href="#">
                                    <img src="http://placekitten.com/g/410/312"/>
                                </a>
                                <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                            </div>
                            <figcaption>
                                <a className="avatar" href="#">
                                    <img src="https://placeimg.com/42/42/any/grayscale"/>Alice Gardner
                                </a>
                                <a className="like J_Like sj sj-heart-o" href="#"></a>
                            </figcaption>
                        </figure>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <figure>
                            <div className="photo">
                                <a className="photo-link" href="#">
                                    <img src="http://placekitten.com/g/410/312"/>
                                </a>
                                <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                            </div>
                            <figcaption>
                                <a className="avatar" href="#">
                                    <img src="https://placeimg.com/42/42/any/grayscale"/>Andrea Matthews
                                </a>
                                <a className="like J_Like sj sj-heart" href="#"></a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="col-lg-4">
                        <figure>
                            <div className="photo">
                                <a className="photo-link" href="#">
                                    <img src="http://placekitten.com/g/410/312"/>
                                </a>
                                <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                            </div>
                            <figcaption>
                                <a className="avatar" href="#">
                                    <img src="https://placeimg.com/42/42/any/grayscale"/>Anna Reyes
                                </a>
                                <a className="like J_Like sj sj-heart-o" href="#"></a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="col-lg-4">
                        <figure>
                            <div className="photo">
                                <a className="photo-link" href="#">
                                    <img src="http://placekitten.com/g/410/312"/>
                                </a>
                                <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
                            </div>
                            <figcaption>
                                <a className="avatar" href="#">
                                    <img src="https://placeimg.com/42/42/any/grayscale"/>Heather Richardson
                                </a>
                                <a className="like J_Like sj sj-heart" href="#"></a>
                            </figcaption>
                        </figure>
                    </div>
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