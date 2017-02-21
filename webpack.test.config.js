var ISDEV = true;

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var settings = {
    path: {
        src: path.join(__dirname, 'src'),
        lib: path.join(__dirname, 'lib')
    }
};

module.exports = {
    context: settings.path.src,
    entry: 'mocha!./__tests__/index.js',
    output: {
        path: __dirname,
        filename: 'test.js',
    },
    module: {
        loaders: [
            {test: /.json$/, loader: 'json'},
            {
                test: /\.js/,
                include: settings.path.src,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015'
                    ]
                }
            }
        ]
    },
    watch: ISDEV,
    watchOptions: {
        aggregateTimeout: 100
    },
    resolve: {
        root: [
            settings.path.src
        ],
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
    ],
    devtool: 'inline-source-map',
    stats: {colors: true},
};