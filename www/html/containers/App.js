import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../less/common.less';

class App extends Component {
    render() {
        let props = this.props;
        let {user} = props;

        return (
            <div>
                {
                    props.location.pathname !== '/' &&
                    <Header
                        user={user}
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