var ISDEV = process.env.NODE_ENV === 'development';

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var settings = {
    path: {
        src: path.join(__dirname, 'src'),
        lib: path.join(__dirname, 'lib')
    }
};

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    context: settings.path.src,
    target: 'node',
    entry: {
        App: './App',
        //fromHtml: './fromHtml',
        Component: './widget/Component',
    },
    output: {
        path: settings.path.lib,
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        library: '[name]',
        sourcePrefix: '    '
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
    externals: nodeModules,
    resolve: {
        root: [
            settings.path.src
        ],
        modulesDirectories: ['node_modules', 'loaders']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.IgnorePlugin(/\.(css|less)$/),
    ],
    devtool: false,
    stats: {colors: true},
};

if (!ISDEV) {
    module.exports.plugins.push(new CleanWebpackPlugin(['.'], {
        root: settings.path.lib,
        verbose: true,
        dry: false
    }));
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        compress: {
            sequences     : true,  // join consecutive statemets with the “comma operator”
            properties    : true,  // optimize property access: a["foo"] → a.foo
            dead_code     : true,  // discard unreachable code
            drop_debugger : true,  // discard “debugger” statements
            unsafe        : false, // some unsafe optimizations (see below)
            conditionals  : true,  // optimize if-s and conditional expressions
            comparisons   : true,  // optimize comparisons
            evaluate      : true,  // evaluate constant expressions
            booleans      : true,  // optimize boolean expressions
            loops         : true,  // optimize loops
            unused        : true,  // drop unused variables/functions
            hoist_funs    : true,  // hoist function declarations
            hoist_vars    : false, // hoist variable declarations
            if_return     : true,  // optimize if-s followed by return/continue
            join_vars     : true,  // join var declarations
            cascade       : true,  // try to cascade `right` into `left` in sequences
            side_effects  : true,  // drop side-effect-free statements
            warnings      : true,  // warn about potentially dangerous optimizations/code
            global_defs   : {}     // global definitions
        },
        beautify: true
    }));
}