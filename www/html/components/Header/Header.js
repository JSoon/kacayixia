import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Header = props => {
    let unick = localStorage.getItem('unick');
    let uavatar = localStorage.getItem('uavatar');

    return (
        <header className="crown">
            <div className="container">
                <div className="logo">
                    <Link className="sj sj-logo" to="/" title="首页"></Link>
                    <h6 className="slogan">一瞬间，便是永恒。</h6>
                </div>
                {
                    unick && uavatar ?
                        <ul className="nav-action-l">
                            <li className="avatar">
                                <a href="#"><img src="containers/My/avatar.png" alt="avatar"/></a>
                            </li>
                            <li className="name">
                                <a href="#">Sharon Guerrero</a>
                            </li>
                            <li className="sign-out"><a href="#">退出</a></li>
                        </ul>
                        :
                        <ul className="nav-action-l">
                            <li><Link to="/sign-in">登录</Link></li>
                            <li><Link to="/sign-up">注册</Link></li>
                        </ul>
                }
                <ul className="nav-action-r">
                    <li>
                        <a className="btn" href="my-upload.html">上传</a>
                    </li>
                    <li>
                        <a className="btn" href="#">摄影集</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

Header.propTypes = {

};

export default Header;