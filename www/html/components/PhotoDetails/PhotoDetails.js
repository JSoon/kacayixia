import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import PhotoItem from '../PhotoItem/PhotoItem';

const PhotoDetails = props => {
    let {
        id,
        photo,
        photographer,
        like
    } = props;

    return (
        <div className="container">
            <div className="moment-details">
                <div className="breadcrumb">
                    <Link to="/moments">
                        <i className="sj sj-arrow-l clear-trans">浏览所有照片</i>
                    </Link>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        {/*照片预览*/}
                        <PhotoItem
                            id={id}
                            className="photo-preview"
                            photo={photo}
                            photographer={photographer}
                            like={like}
                            />
                        {/*<figure className="photo-preview">
                            <div className="photo">
                                <a className="photo-link" href="http://placekitten.com/g/1200/900">
                                    <img className="img-responsive" src="http://placekitten.com/g/1200/900"/>
                                </a>
                                <a className="photo-over J_PhotoPreview" href="http://placekitten.com/g/1200/900" title="Place Kitten">
                                    <i className="sj sj-magnifier"></i>
                                </a>
                            </div>
                            <figcaption>
                                <a className="avatar" href="#">
                                    <img src="http://placekitten.com/g/40/40"/>Randy Ortiz
                                </a>
                                <a className="like J_Like" href="#"><i className="sj sj-heart"></i></a>
                            </figcaption>
                        </figure>*/}
                    </div>
                    <div className="col-lg-4">
                        {/*照片信息*/}
                        <section className="photo-info">
                            <div className="description">
                                <h3 className="title"><i className="sj sj-info"></i>风一样的男子</h3>
                                <p>“It was one of those March days when the sun shines hot and the wind blows cold: when it is summer in the light, and winter in... </p>
                            </div>
                            <ul className="info">
                                <li>
                                    <span className="k">时间</span>
                                    <span className="v">2015/05/07 14: 30</span>
                                </li>
                                <li>
                                    <span className="k">相机</span>
                                    <span className="v">佳能5D</span>
                                </li>
                                <li>
                                    <span className="k">镜头</span>
                                    <span className="v">DT 18-135mm F3.5-5.6 SAM</span>
                                </li>
                                <li>
                                    <span className="k">ISO</span>
                                    <span className="v">200</span>
                                </li>
                                <li>
                                    <span className="k">光圈</span>
                                    <span className="v">f/4.0</span>
                                </li>
                                <li>
                                    <span className="k">焦距</span>
                                    <span className="v">18mm</span>
                                </li>
                                <li>
                                    <span className="k">曝光</span>
                                    <span className="v">1/60s</span>
                                </li>
                            </ul>
                            <ul className="price">
                                <li>
                                    <div id="J_Dl480p" className="dl-btn">
                                        <span className="k">
                                            <i className="sj sj-download clear-trans"></i>
                                            标清
                                            <em>1200x800px 5mb</em>
                                        </span>
                                        <span className="v">免费</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="dl-btn">
                                        <span className="k">
                                            <i className="sj sj-download clear-trans"></i>
                                            高清
                                            <em>1200x800px 5mb</em>
                                        </span>
                                        <span className="v">5元</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="dl-btn">
                                        <span className="k">
                                            <i className="sj sj-download clear-trans"></i>
                                            超清
                                            <em>1200x800px 5mb</em>
                                        </span>
                                        <span className="v">15元</span>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

PhotoDetails.propTypes = {
    className: PropTypes.string,
    photo: PropTypes.object.isRequired,
    photographer: PropTypes.object.isRequired,
    like: PropTypes.bool.isRequired
};

export default PhotoDetails;