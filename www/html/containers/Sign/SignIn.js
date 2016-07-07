import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import PageTitle from '../../components/PageTitle/PageTitle';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import './sign.less';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }


    // 登录
    // var form = $('.J_SignInForm'),
    //     loading = $('.J_SignInLoading');
    // $('.J_Submit').on('click', function (e) {
    //     e.preventDefault();
    //     setTimeout(function () {
    //         form.addClass('animated fadeOutDown');
    //         loading.fadeIn().children('li:not(".loading")').addClass('animated fadeInUp');
    //     }, 500);
    // });


    // 提交登录
    onSubmitClick() {
        // let {router} = this.props;
        // router.push('/moments');
        console.log(this.refs.signInForm);
        this.refs.signInForm.submit();
        console.log('onSubmitClick');
    }

    onFormSubmit(e) {
        console.log('onFormSubmit');
        e.preventDefault();
    }

    render() {
        return (
            <div className="sign-tree">
                <main className="trunk">
                    <div className="container">
                        <PageTitle
                            title={'登录'}
                            subTitle={'即刻开启专属于您的瞬间。'}
                            />
                        <section className="sign-in-animation">
                            <form className="sign-in-form" ref="signInForm" onSubmit={this.onFormSubmit}>
                                <div className="row">
                                    <div className="col-lg-4 col-lg-offset-4">
                                        <Input type={'email'} placeholder={'电子邮箱'}/>
                                        <Input type={'password'} placeholder={'密码'}/>
                                        <div className="form-group">
                                            <Button
                                                text={'登 录'}
                                                onClick={this.onSubmitClick}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <ul className="sign-in-loading J_SignInLoading">
                                <li className="avatar">
                                    <img src="app/sign/img/avatar.png" alt="avatar"/>
                                </li>
                                <li className="name">Lori Foster</li>
                                <li className="loading">
                                    <div className="sk-wave">
                                        <div className="sk-rect sk-rect1"></div>
                                        <div className="sk-rect sk-rect2"></div>
                                        <div className="sk-rect sk-rect3"></div>
                                        <div className="sk-rect sk-rect4"></div>
                                        <div className="sk-rect sk-rect5"></div>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <div className="sign-switch">
                            <span>还没有账号？</span><Link to="/sign-up">去注册</Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default connect()(withRouter(SignIn));;