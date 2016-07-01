import React, {Component} from 'react';
import {connect} from 'react-redux';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';
import Update from 'react-addons-update';
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
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onReplyClick = this.onReplyClick.bind(this);
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
            // storeState 用于存放主要数据
            // 将单张照片详情置于 storeState 外单独处理
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

    // 照片点赞
    onLikeClick(e, id) {
        e.preventDefault();
        let that = this;
        setTimeout(function () {
            // console.log(that); // bind to Moment
            // console.log(this); // bind to Window
            that.setState({
                like: !that.state.like
            });
        }, 500);
    }

    // 发表评论
    onCommentSubmit(e, input) {
        e.preventDefault();
        let value = input.value;
        // post comment
        if (value.trim() === '') {
            return;
        }
        var newComments = Update(this.state.comments, {
            $push: [
                {
                    "user": {
                        "id": 5,
                        "name": "JSoon",
                        "avatar": "http://placekitten.com/g/40/40",
                        "url": ""
                    },
                    "text": value,
                    "time": "2016/07/01, 15:11",
                    "replies": []
                }
            ]
        });
        this.setState({
            comments: newComments
        });
        input.value = '';
    }

    // 点击回复
    onReplyClick(e, replyForm) {
        e.preventDefault();
        console.log(replyForm);
        $(replyForm).show();
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
                            onCommentSubmit={this.onCommentSubmit}
                            onReplyClick={this.onReplyClick}
                            />
                    }
                </main>
            </div>
        );
    }
}

export default connect()(Moment);