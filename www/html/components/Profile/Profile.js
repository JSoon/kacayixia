import React, {PropTypes} from 'react';

const Profile = props => {
    return (
        <div className="my-profile">
            <div className="title">
                <h1>个人资料</h1>
                <h4>修改头像、昵称或者登录密码。</h4>
            </div>
            <form className="row">
                <div className="col-lg-4 col-lg-offset-4">
                    <div className="form-group">
                        <div className="avatar-upload-change">
                            <img src="app/my/img/avatar.png" alt="avatar"/>
                            <a className="upload-link" href="#">
                                点击<br/>修改头像
                            </a>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-text">
                            <input type="text" value="Sharon Guerrero" placeholder="用户名（昵称）"/>
                            <i className="input-border"></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-text">
                            <input type="email" value="serdeemail@gmail.com" disabled/>
                            <i className="input-border"></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-text">
                            <input type="password" placeholder="原密码"/>
                            <i className="input-border"></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-text">
                            <input type="password" placeholder="新密码"/>
                            <i className="input-border"></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-text">
                            <input type="password" placeholder="确认新密码"/>
                            <i className="input-border"></i>
                        </div>
                    </div>
                    <div className="form-group">
                        <a className="btn btn-block" href="#">保 存</a>
                    </div>
                </div>
            </form>
        </div>
    );
};

Profile.propTypes = {

};

export default Profile;