import App from './containers/App';

const routeConfig = {
    path: '/',
    component: App,
    indexRoute: {
        getComponent(location, cb) {
            require.ensure([], (require) => {
                cb(null, require('./containers/Home/Home').default)
            }, 'containers/Home/Home');
        }
    },
    childRoutes: [
        {
            path: '/moments',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./containers/Moments/Moments').default)
                }, 'containers/Moments/Moments');
            }
        }
    ]
};

export default routeConfig;


