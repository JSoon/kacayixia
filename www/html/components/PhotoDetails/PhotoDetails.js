import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import PhotoItem from '../PhotoItem/PhotoItem';
import Comments from '../Comments/Comments';

const PhotoDetails = props => {
    let {
        id,
        photo,
        photographer,
        like,
        preview,
        downloads,
        comments
    } = props;

    return (
        <div className="container">
            <div className="moment-details">
                <div className="breadcrumb">
                    <Link to="/moments">
                        <i className="sj sj-arrow-l">浏览所有照片</i>
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
                            preview={preview}
                            onLikeClick={
                                (e) => {
                                    props.onLikeClick(e, id);
                                }
                            }
                            />
                    </div>
                    <div className="col-lg-4">
                        {/*照片信息*/}
                        <section className="photo-info">
                            <div className="description">
                                <h3 className="title"><i className="sj sj-info"></i>{photo.title}</h3>
                                <p>{photo.descr}</p>
                            </div>
                            <ul className="info">
                                <li>
                                    <span className="k">上传</span>
                                    <span className="v">{photo.upload}</span>
                                </li>
                                <li>
                                    <span className="k">拍摄</span>
                                    <span className="v">{photo.shoot}</span>
                                </li>
                                <li>
                                    <span className="k">相机</span>
                                    <span className="v">{photo.camera.name}</span>
                                </li>
                                <li>
                                    <span className="k">镜头</span>
                                    <span className="v">{photo.camera.lens}</span>
                                </li>
                                <li>
                                    <span className="k">ISO</span>
                                    <span className="v">{photo.camera.iso}</span>
                                </li>
                                <li>
                                    <span className="k">光圈</span>
                                    <span className="v">{photo.camera.aperture}</span>
                                </li>
                                <li>
                                    <span className="k">焦距</span>
                                    <span className="v">{photo.camera.focus}</span>
                                </li>
                                <li>
                                    <span className="k">曝光</span>
                                    <span className="v">{photo.camera.exposure}</span>
                                </li>
                            </ul>
                            <ul className="price">
                                {
                                    downloads.map((dl, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="dl-btn clearfix">
                                                    <span className="k">
                                                        <i className="sj sj-download"></i>
                                                        {dl.name}
                                                        <em>{dl.resolution} {dl.size}</em>
                                                    </span>
                                                    <span className="v">{dl.price}</span>
                                                </div>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <Comments
                            comments={comments}
                            onCommentSubmit={props.onCommentSubmit}
                            onReplyClick={props.onReplyClick}
                            onReplySubmit={props.onReplySubmit}
                            />
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