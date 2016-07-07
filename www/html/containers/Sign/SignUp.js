import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import PageTitle from '../../components/PageTitle/PageTitle';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import './sign.less';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    // 提交注册
    onSubmitClick() {
        let {router} = this.props;
        alert('注册成功！')
        router.push('/sign-in');
    }

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
                                <Input type={'text'} placeholder={'用户名（昵称）'}/>
                                <Input type={'email'} placeholder={'电子邮箱'}/>
                                <Input type={'password'} placeholder={'密码'}/>
                                <Input type={'password'} placeholder={'确认密码'}/>
                                <div className="form-group">
                                    <Button
                                        text={'注 册'}
                                        onClick={this.onSubmitClick}
                                        />
                                </div>
                            </div>
                        </form>
                        <div className="sign-switch">
                            <span>已有账号？</span><Link to="/sign-in">去登录</Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default connect()(withRouter(SignUp));