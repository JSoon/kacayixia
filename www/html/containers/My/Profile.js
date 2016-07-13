import React, {Component} from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import Input from '../../components/Form/Input';
import Button from '../../components/Button/Button';
import './my.less';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log(e.target);
    }

    render() {
        return (
            <div className="my-tree">
                <main className="trunk">
                    <div className="container">
                        <div className="my-profile">
                            <PageTitle
                                title="个人资料"
                                subTitle="修改头像、昵称或者登录密码。"
                                />
                            <form className="row" onSubmit={this.onFormSubmit}>
                                <div className="col-lg-4 col-lg-offset-4">
                                    <div className="form-group">
                                        <div className="avatar-upload-change">
                                            <img src="containers/My/avatar.png" alt="avatar"/>
                                            <a className="upload-link" href="#">
                                                点击<br/>修改头像
                                            </a>
                                        </div>
                                    </div>
                                    <Input type={'text'} placeholder={'用户名（昵称）'}/>
                                    <Input type={'email'} value="serdeemail@gmail.com" disabled placeholder={'用户名（昵称）'}/>
                                    <Input type={'password'} placeholder={'原密码'}/>
                                    <Input type={'password'} placeholder={'新密码'}/>
                                    <Input type={'password'} placeholder={'确认新密码'}/>
                                    <div className="form-group">
                                        <Button type="submit" text="保 存"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
};

export default Profile;