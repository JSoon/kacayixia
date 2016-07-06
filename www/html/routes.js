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
            path: '/sign-up',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./containers/Sign/SignUp').default)
                }, 'containers/Sign/SignUp');
            }
        },
        {
            path: '/moments',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./containers/Moments/Moments').default)
                }, 'containers/Moments/Moments');
            }
        },
        {
            path: '/moments/:id',
            getComponent(location, cb) {
                require.ensure([], (require) => {
                    cb(null, require('./containers/Moment/Moment').default)
                }, 'containers/Moment/Moment');
            }
        }
    ]
};

export default routeConfig;


