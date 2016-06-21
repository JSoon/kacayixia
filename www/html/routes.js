import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
// import Home from './containers/Home/Home';
// import Test from './containers/Home/Test';
// import Moments from './containers/Moments/Moments';

// const routes = (
//     <Route path="/" component={App}>
//         <IndexRoute component={Home}/>
//         <Route path="/moments" component={Moments}/>
//     </Route>
// );

const routeConfig = {
    path: '/',
    component: App,
    // indexRoute: {
    //     component: Test
    // },
    getIndexRoute(location, callback) {
        require.ensure([], function (require) {
            callback(null, require('./containers/Home/Test'))
        })
    },
    // getIndexRoute(location, cb) {
    //     require.ensure([], (require) => {
    //         // cb(null, require('./containers/Home/Home'))
    //         cb(null, require('./containers/Home/Test'))
    //     }, 'Test');
    // },
    childRoutes: [
        // {
        //     path: '/moments',
        //     // component: Moments
        //     getComponent(location, cb) {
        //         require.ensure([], (require) => {
        //             cb(null, require('./containers/Moments/Moments'))
        //         });
        //     }
        // }
    ]
};

export default routeConfig;


