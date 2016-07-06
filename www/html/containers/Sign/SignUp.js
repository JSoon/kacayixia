import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import PageTitle from '../../components/PageTitle/PageTitle';
import './sign.less';

class SignUp extends Component {
    render() {
        return (
            <div className="sign-tree">
                <main className="trunk">
                    <div className="container">
                        <PageTitle
                            title={'注册'}
                            subTitle={'只需花费您1分钟的时间，即可上传专属您的瞬间。'}
                            />
                        <form className="row">
                            <div className="col-lg-4 col-lg-offset-4">
                                <div className="form-group">
                                    <div className="avatar-upload-default">
                                        <i className="sj sj-joke-face"></i>
                                        <a className="upload-link" href="#">点击<br/>上传头像</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-text">
                                        <input type="text" placeholder="用户名（昵称）"/>
                                        <i className="input-border"></i>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-text">
                                        <input type="email" placeholder="电子邮箱"/>
                                        <i className="input-border"></i>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-text">
                                        <input type="password" placeholder="密码"/>
                                        <i className="input-border"></i>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-text">
                                        <input type="password" placeholder="确认密码"/>
                                        <i className="input-border"></i>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <a className="btn btn-block" href="#">注 册</a>
                                </div>
                            </div>
                        </form>
                        <div className="sign-switch">
                            <span>已有账号？</span><a href="sign-in.html">去登录</a>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

SignUp.propTypes = {

};

export default connect()(SignUp);