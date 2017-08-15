const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './lib/markdown-html-parser.js'),

    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'markdown-html-parser.min.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: 'babel-loader',
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {warnings: false},
            output: {comments: false},
            comments: false
        })
    ],
};
