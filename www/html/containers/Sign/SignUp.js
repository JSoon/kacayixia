import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import PageTitle from '../../components/PageTitle/PageTitle';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import AvatarCropper from '../../components/AvatarCropper/AvatarCropper';
import 'cropper/dist/cropper.css';
import './sign.less';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropperDisplay: false
        };
        this.onAvatarClick = this.onAvatarClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    // 上传头像
    onAvatarClick(e) {
        e.preventDefault();
        $.bs.popup.custom({
            title: '上传头像',
            dom: AvatarCropper
        }, function (dialogE) {
            let img = $(dialogE).find('img');
            $(img).cropper({
                autoCrop: false,
                viewMode: 1,
                dragMode: 'move',
                aspectRatio: 1,
                preview: '.img-preview',
                crop: function (e) {
                    console.log('e.x:', e.x);
                    console.log('e.y:', e.y);
                    console.log('e.width:', e.width);
                    console.log('e.height:', e.height);
                    console.log('e.rotate:', e.rotate);
                    console.log('e.scaleX:', e.scaleX);
                    console.log('e.scaleY:', e.scaleY);
                },
                built: function () {
                    $(img).cropper('crop');
                    $(img).show();
                }
            });
        });
    }

    // 提交注册
    onFormSubmit(e) {
        e.preventDefault();
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
                        <form className="row" onSubmit={this.onFormSubmit}>
                            <div className="col-lg-4 col-lg-offset-4">
                                <div className="form-group">
                                    <div className="avatar-upload-default">
                                        <i className="sj sj-joke-face"></i>
                                        <a className="upload-link" href="#" onClick={this.onAvatarClick}>点击<br/>上传头像</a>
                                    </div>
                                </div>
                                <Input type={'text'} placeholder={'用户名（昵称）'}/>
                                <Input type={'email'} placeholder={'电子邮箱'}/>
                                <Input type={'password'} placeholder={'密码'}/>
                                <Input type={'password'} placeholder={'确认密码'}/>
                                <div className="form-group">
                                    <Button
                                        type={'submit'}
                                        text={'注 册'}
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