import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {fetchLogout} from '../actions/user';
import '../less/common.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(e) {
        e.preventDefault();
        let {dispatch} = this.props;
        let uid = localStorage.getItem('uid');
        dispatch(fetchLogout(uid));
    }

    render() {
        let props = this.props;
        let uid = localStorage.getItem('uid');

        return (
            <div>
                {
                    props.location.pathname !== '/' &&
                    <Header
                        uid={uid}
                        onLogoutClick={this.onLogoutClick}
                        />
                }
                {props.children}
                {
                    props.location.pathname !== '/' &&
                    <Footer />
                }
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App);