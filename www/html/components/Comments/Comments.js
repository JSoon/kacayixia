import React, {PropTypes} from 'react';

const Comments = props => {
    return (
        <div className="comments">
            <h4 className="title">
                <i className="sj sj-comment"></i>
                <span>2</span>条评论
            </h4>
            {/*发表评论*/}
            <form className="row">
                <div className="col-lg-9">
                    <div className="form-group">
                        <div className="input-text">
                            <input type="text" placeholder="说点什么吧 ;)"/>
                            <i className="input-border"></i>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="form-group">
                        <a className="btn btn-block" href="#">发表评论</a>
                    </div>
                </div>
            </form>
            {/*评论列表*/}
            <ul className="media-list">
                <li className="media">
                    <div className="media-left">
                        <a href="#">
                            <img className="media-object" src="http://placekitten.com/g/40/40" alt="avatar"/>
                        </a>
                    </div>
                    <div className="media-body">
                        <h5 className="media-heading"><a href="#">Judith Hernandez</a></h5>
                        <div className="media-content">
                            <p>我喜欢这张照片，你是在哪儿拍摄的？</p>
                            <p className="media-meta">
                                2015/05/18, 11: 40
                                <a className="sj sj-reply J_Reply" href="#" title="回复"></a>
                            </p>
                            <div className="comment-reply row">
                                <div className="col-lg-9">
                                    <div className="form-group">
                                        <div className="input-text">
                                            <input type="text" placeholder="回复 Judith Hernandez"/>
                                            <i className="input-border"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <a className="btn btn-block" href="#">回复</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="media">
                    <div className="media-left">
                        <a href="#">
                            <img className="media-object" src="http://placekitten.com/g/40/40" alt="avatar"/>
                        </a>
                    </div>
                    <div className="media-body">
                        <h5 className="media-heading"><a href="#">Keith Freeman</a></h5>
                        <div className="media-content">
                            <p>i love it dude!</p>
                            <p className="media-meta">
                                2015/05/21, 17: 33
                                <a className="sj sj-reply J_Reply" href="#" title="回复"></a>
                            </p>
                        </div>
                        <div className="media">
                            <div className="media-left">
                                <a href="#">
                                    <img className="media-object" src="http://placekitten.com/g/40/40" alt="avatar"/>
                                </a>
                            </div>
                            <div className="media-body">
                                <h5 className="media-heading"><a href="#">Kelly Berry</a></h5>
                                <div className="media-content">
                                    <p>看来我们有共同的喜好：）</p>
                                    <p className="media-meta">
                                        2015/05/23, 12: 16
                                        <a className="sj sj-reply J_Reply" href="#" title="回复"></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

Comments.propTypes = {
    
};

export default Comments;