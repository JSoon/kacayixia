import React, {Component, PropTypes} from 'react';

class Comments extends Component {
    render() {
        let {
            comments
        } = this.props;

        return (
            <div className="comments">
                <h4 className="title">
                    <i className="sj sj-comment"></i>
                    <span>{comments.length}</span>条评论
                </h4>
                {/*发表评论*/}
                <form className="row">
                    <div className="col-lg-9">
                        <div className="form-group">
                            <div className="input-text">
                                <input ref="commentInput" type="text" placeholder="说点什么吧 ;)"/>
                                <i className="input-border"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="form-group">
                            <a className="btn btn-block" href="#" onClick={
                                (e) => {
                                    let input = this.refs.commentInput;
                                    this.props.onCommentSubmit(e, input);
                                }
                            }>发表评论</a>
                        </div>
                    </div>
                </form>
                {/*评论列表*/}
                <ul className="media-list">
                    {
                        comments.map((comment, index) => {
                            return (
                                <li className="media" key={index}>
                                    <div className="media-left">
                                        <a href="#">
                                            <img className="media-object" src={comment.user.avatar} alt="avatar"/>
                                        </a>
                                    </div>
                                    <div className="media-body">
                                        <h5 className="media-heading"><a href="#">{comment.user.name}</a></h5>
                                        <div className="media-content">
                                            <p>{comment.text}</p>
                                            <p className="media-meta">
                                                {comment.time}
                                                <a className="sj sj-reply" href="#" title="回复"
                                                    onClick={
                                                        (e) => {
                                                            let replyForm = this.refs["replyForm_" + index];
                                                            this.props.onReplyClick(e, replyForm);
                                                        }
                                                    }>
                                                </a>
                                            </p>
                                        </div>
                                        {
                                            comment.replies.length !== 0 &&
                                            comment.replies.map((reply, replyIndex) => {
                                                return (
                                                    <div className="media" key={replyIndex}>
                                                        <div className="media-left">
                                                            <a href="#">
                                                                <img className="media-object" src={reply.user.avatar} alt="avatar"/>
                                                            </a>
                                                        </div>
                                                        <div className="media-body">
                                                            <h5 className="media-heading"><a href="#">{reply.user.name}</a></h5>
                                                            <div className="media-content">
                                                                <p>{reply.text}</p>
                                                                <p className="media-meta">
                                                                    {reply.time}
                                                                    <a className="sj sj-reply" href="#" title="回复"
                                                                        onClick={
                                                                            (e) => {
                                                                                let replyOthersForm = this.refs['replyOthersForm_' + index];
                                                                                let replyOthersInput = this.refs['replyOthersInput_' + index];
                                                                                replyOthersInput.placeholder = '回复 ' + reply.user.name;
                                                                                this.props.onReplyClick(e, replyOthersForm);
                                                                            }
                                                                        }>
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div ref={"replyOthersForm_" + index} className="comment-reply row">
                                            <div className="col-lg-9">
                                                <div className="form-group">
                                                    <div className="input-text">
                                                        <input ref={"replyOthersInput_" + index} type="text" placeholder=""/>
                                                        <i className="input-border"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="form-group">
                                                    <a className="btn btn-block" href="#"
                                                        onClick={
                                                            (e) => {

                                                            }
                                                        }>回复</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div ref={"replyForm_" + index} className="comment-reply row">
                                        <div className="col-lg-9">
                                            <div className="form-group">
                                                <div className="input-text">
                                                    <input type="text" placeholder={"回复 " + comment.user.name}/>
                                                    <i className="input-border"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <a className="btn btn-block" href="#"
                                                    onClick={
                                                        (e) => {

                                                        }
                                                    }>回复</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
};

Comments.propTypes = {

};

export default Comments;