/**
 * webpack config
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'redux-logger',
            'redux-thunk'
        ],
        plugins: [
            'magnific-popup',
            'bootstrap-popup',
            'cropper'
        ],
        app: './html/index'
    },
    output: {
        path: './html/dist',
        publicPath: '/html/dist/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    plugins: ['transform-object-rest-spread'],
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css|less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'image/png',
                    limit: 5000
                }
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
        // 'redux': 'Redux',
        // 'react-redux': 'ReactRedux',
        // 'react-router': 'ReactRouter',
        // 'redux-logger': 'reduxLogger',
        // 'redux-thunk': 'ReduxThunk'
        'jquery': 'jQuery',
        '$': '$',
        'bootstrap': '$'
    },
    // add this handful of plugins that optimize the build
    // when we're in production
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js',
                chunks: ['vendor', 'app'],
                minChunks: Infinity
            })
        ]
};
