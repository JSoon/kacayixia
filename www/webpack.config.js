/**
 * webpack config
 */
var webpack = require('webpack');

module.exports = {
    entry: {
        'vendor': [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router',
            'redux-logger',
            'redux-thunk'
        ],
        'index': './html/index.js'
    },
    output: {
        filename: '[name].js',
        path: './html/dist'
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
                test: /\.less$/,
                exclude: /(node_modules|bower_components)/,
                loader: "style!css!less"
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
        // 'react-router': 'ReactRouter'
    },
    // add this handful of plugins that optimize the build
    // when we're in production
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : []
};
