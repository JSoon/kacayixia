import React, {Component} from 'react';
import './my.less'

class My extends Component {
    render() {
        return (
            <div className="my-tree">
                <main className="trunk">
                    <div className="container">
                        {this.props.children}
                    </div>
                </main>
            </div>
        );
    }
}

export default My;