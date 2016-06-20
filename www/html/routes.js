import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home/Home';
import Moments from './containers/Moments/Moments';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/moments" component={Moments}/>
    </Route>
);

export default routes;


