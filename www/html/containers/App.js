import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {fetchLogout} from '../actions/user';
import 'magnific-popup/dist/magnific-popup.css';
import 'fine-uploader/fine-uploader/fine-uploader-new.css';
import '../less/common.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(e) {
        e.preventDefault();
        let {dispatch, user} = this.props;
        dispatch(fetchLogout(user.id));
    }

    render() {
        let props = this.props;

        return (
            <div>
                {
                    props.location.pathname !== '/' &&
                    <Header
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