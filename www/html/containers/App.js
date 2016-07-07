import React, {Component} from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import '../less/common.less';

class App extends Component {
    render() {
        let props = this.props;

        return (
            <div>
                {props.location.pathname !== '/' &&
                    <Header />
                }
                {props.children}
                {props.location.pathname !== '/' &&
                    <Footer />
                }
            </div>
        );
    }
};

export default App;