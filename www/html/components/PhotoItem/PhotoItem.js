import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PhotoItem = props => {
    let {
        className,
        id,
        topPick,
        photo,
        photographer,
        like,
        preview
    } = props;

    let likeClass = like ? 'sj-heart' : 'sj-heart-o';

    return (
        <figure className={className}>
            {
                !preview ?
                    <div className="photo">
                        <Link className="photo-link" to={"/moments/" + id}>
                            <img className="img-responsive" src={photo.url} title={photo.title} alt={photo.title}/>
                        </Link>
                        <Link className="photo-over" to={"/moments/" + id}>
                            <i className="sj sj-magnifier"></i>
                        </Link>
                    </div>
                    :
                    <div className="photo">
                        <a className="photo-link" href="http://placekitten.com/g/1200/900">
                            <img className="img-responsive" src={photo.url} title={photo.title} alt={photo.title}/>
                        </a>
                        <a className="photo-over J_PhotoPreview" href="http://placekitten.com/g/1200/900" title="Place Kitten">
                            <i className="sj sj-magnifier"></i>
                        </a>
                    </div>
            }
            <figcaption>
                <a className="avatar" href={photographer.url}>
                    <img src={photographer.avatar}/>{photographer.name}
                </a>
                <a className={"like J_Like sj " + likeClass} href="#" onClick={props.onLikeClick}></a>
            </figcaption>
        </figure>
    );
}

PhotoItem.propTypes = {
    className: PropTypes.string,
    id: PropTypes.number.isRequired,
    topPick: PropTypes.bool,
    photo: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired,
    photographer: PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    like: PropTypes.bool.isRequired
};

export default PhotoItem;