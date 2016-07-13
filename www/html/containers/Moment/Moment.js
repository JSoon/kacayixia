import React, {Component} from 'react';
import {connect} from 'react-redux';
import PhotoDetails from '../../components/PhotoDetails/PhotoDetails';
import Update from 'react-addons-update';
import '../Moments/Moments.less';
import 'magnific-popup/dist/magnific-popup.css';

class Moment extends Component {
    constructor(props) {
        super(props);
        this.state = null;
        // When creating callbacks in JavaScript, you usually need to explicitly bind a method to
        // its instance such that the value of this is correct.
        // With React, every method is automatically bound to its component instance
        // (except when using ES6 class syntax).
        // https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onReplyClick = this.onReplyClick.bind(this);
        this.onReplySubmit = this.onReplySubmit.bind(this);
    }

    componentDidMount() {
        // 获取照片详情
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
                preview: json.preview,
                like: json.like,
                downloads: json.downloads,
                comments: json.comments
            }, function () {
                // 照片预览
                $('.J_PhotoPreview').magnificPopup({
                    type: 'image',
                    closeBtnInside: false,
                    closeOnContentClick: true,
                    mainClass: 'mfp-img-mobile',
                    image: {
                        verticalFit: true
                    }
                });
            });
        });
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
        }, function () {
            input.value = '';
        });
    }

    // 点击回复
    onReplyClick(e, refs, form, input) {
        e.preventDefault();
        for (let r in refs) {
            if (/comment-reply/.test(refs[r].className)) {
                // 隐藏所有评论输入框
                refs[r].style.display = 'none';
            }
        }
        // 显示当前评论输入框，并获取焦点
        form.style.display = 'block';
        input.focus(); // IE9+
    }

    // 提交回复
    onReplySubmit(e, input, index) {
        e.preventDefault();
        let value = input.value;
        let replier = input.placeholder.slice(3);
        // post comment
        if (value.trim() === '') {
            return;
        }
        let newComments = Update(this.state.comments, {
            $set: this.state.comments
        });
        let newReplies = Update(this.state.comments[index].replies, {
            $push: [
                {
                    "user": {
                        "id": 6,
                        "name": "Strak",
                        "avatar": "http://placekitten.com/g/40/40",
                        "url": ""
                    },
                    "atUser": {
                        "id": 7,
                        "name": replier,
                        "url": ""
                    },
                    "text": value,
                    "time": "2016/07/04, 10:25"
                }
            ]
        });
        newComments[index].replies = newReplies;
        this.setState({
            comments: newComments
        }, function () {
            input.value = '';
        });
    }

    render() {
        return (
            <div className="moments-tree">
                <main className="trunk">
                    {
                        this.state &&
                        <PhotoDetails
                            { ...this.state }
                            onLikeClick={this.onLikeClick}
                            onCommentSubmit={this.onCommentSubmit}
                            onReplyClick={this.onReplyClick}
                            onReplySubmit={this.onReplySubmit}
                            />
                    }
                </main>
            </div>
        );
    }
}

export default connect()(Moment);