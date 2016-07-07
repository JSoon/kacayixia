import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const Header = props => {
    return (
        <header className="crown">
            <div className="container">
                <div className="logo">
                    <Link className="sj sj-logo" to="/" title="首页"></Link>
                    <h6 className="slogan">一瞬间，便是永恒。</h6>
                </div>
                <ul className="nav-action-l">
                    <li><Link to="/sign-in">登录</Link></li>
                    <li><Link to="/sign-up">注册</Link></li>
                    {
                        /*
                        <li className="avatar">
                            <a href="#"><img src="app/global/me.png" alt="avatar"/></a>
                        </li>
                        <li className="name">
                            <a href="#">Sharon Guerrero</a>
                        </li>
                        <li className="sign-out"><a href="#">退出</a></li>
                        */
                    }
                </ul>
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