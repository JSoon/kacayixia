// import React from 'react';

// const App = (props) => {
//     return (
//         <div>
//             {props.children}
//         </div>
//     );
// };

import React, {Component} from 'react';

class App extends Component {
    render() {
        console.log(this.props.children);
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default App;

// export default App;