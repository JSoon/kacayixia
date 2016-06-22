import React, {Component} from 'react';
import '../less/common.less'

const App = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default App;