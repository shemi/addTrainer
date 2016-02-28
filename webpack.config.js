'use strict';

var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    APP = __dirname;

module.exports = {
    context: APP,
    entry: './app/core/bootstrap.js',
    output: {
        path: path.join(APP, 'js/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css-loader?sourceMap!sass-loader?sourceMap")
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader : 'file-loader?name=res/[name].[ext]?[hash]'
            },
            {
                test: /\.html/,
                loader: 'raw!html-minify'
            },
            {
                test: /\.json/,
                loader: 'json'
            }
        ]
    },

    resolve: {
        root: APP
    },

    plugins: [
        new ExtractTextPlugin("/css/[name].css", { allChunks: true }),
        new webpack.DefinePlugin({
            MODE: {
                production: process.env.NODE_ENV === 'production'
            }
        }),
        new LiveReloadPlugin(),
    ]
};