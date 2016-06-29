import React, {Component} from 'react';
import {connect} from 'react-redux';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';
import '../Moments/Moments.less';

class Moment extends Component {
    constructor(props) {
        super(props);
        // When creating callbacks in JavaScript, you usually need to explicitly bind a method to
        // its instance such that the value of this is correct.
        // With React, every method is automatically bound to its component instance
        // (except when using ES6 class syntax).
        // https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onCommentClick = this.onCommentClick.bind(this);
    }

    componentDidMount() {
        let that = this;
        let id = that.props.params.id;
        $.ajax({
            url: 'data/photoDetails.json',
            data: {
                id: id
            }
        }).done((json) => {
            that.setState({
                id: json.id,
                photo: json.photo,
                photographer: json.photographer,
                like: json.like,
                downloads: json.downloads,
                comments: json.comments
            });
        }).fail((err) => console.log(err));
    }

    onCommentClick(e) {
        e.preventDefault();
        console.log(this.state);
    }

    onLikeClick(e) {
        console.log(this.state);
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
        return (
            <div className="moments-tree">
                <main className="trunk">
                    {
                        !$.isEmptyObject(this.state) &&
                        <PhotoDetails
                            { ...this.state }
                            onLikeClick={this.onLikeClick}
                            onCommentClick={this.onCommentClick}
                            />
                    }
                </main>
            </div>
        );
    }
}

export default connect()(Moment);