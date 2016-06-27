import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class PhotoItem extends Component {
    constructor(props) {
        super(props);
        // When creating callbacks in JavaScript, you usually need to explicitly bind a method to
        // its instance such that the value of this is correct.
        // With React, every method is automatically bound to its component instance
        // (except when using ES6 class syntax).
        // https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html
        this.onClickLike = this.onClickLike.bind(this);
    }

    onClickLike(e) {
        e.preventDefault();
        let heart = $(e.target);
        // 若未点赞，则加赞
        if (heart.hasClass('sj-heart-o')) {
            heart.removeClass('sj-heart-o');
            heart.addClass('sj-heart');
        }
        // 若已点赞，则取消赞
        else {
            heart.removeClass('sj-heart');
            heart.addClass('sj-heart-o');
        }
    }

    render() {
        let {
            className,
            id,
            topPick,
            photo,
            photographer,
            like
        } = this.props;

        let likeClass = like ? 'sj-heart' : 'sj-heart-o';

        return (
            <figure className={className}>
                <div className="photo">
                    <Link className="photo-link" to={"/moments/" + id}>
                        <img className="img-responsive" src={photo.url} title={photo.title} alt={photo.title}/>
                    </Link>
                    <Link className="photo-over" to={"/moments/" + id}><i className="sj sj-magnifier"></i></Link>
                </div>
                <figcaption>
                    <a className="avatar" href={photographer.url}>
                        <img src={photographer.avatar}/>{photographer.name}
                    </a>
                    <a className={"like J_Like sj " + likeClass} href="#" onClick={this.onClickLike}></a>
                </figcaption>
            </figure>
        );
    }
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