import React, {PropTypes} from 'react';

const PhotoItem = props => {
    let {
        topPick,
        photo,
        photographer
    } = props;

    let topPickClass = topPick ? 'top-pick' : '';

    return (
        <figure className={topPickClass}>
            <div className="photo">
                <a className="photo-link" href="#">
                    <img src={photo.url} title={photo.title} alt={photo.title}/>
                </a>
                <a className="photo-over" href="#"><i className="sj sj-magnifier"></i></a>
            </div>
            <figcaption>
                <a className="avatar" href={photographer.url}>
                    <img src={photographer.avatar}/>{photographer.name}
                </a>
                <a className="like J_Like sj sj-heart" href="#"></a>
            </figcaption>
        </figure>
    );
};

PhotoItem.propTypes = {
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
};

export default PhotoItem;