var webpack = require('webpack');
var path = require('path');

module.exports = {

    //需要打包的文件入口
    entry: [
        'babel-polyfill',
        path.resolve(__dirname, 'src/App.jsx')
    ],

    //生成文件的出口
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js'
    },

    //require的时候不需要加上文件扩展名
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'style-loader!css-loader?modules'
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel'     //对代码进行babel转码,同时需要注意在.babelrc文件下添加了的配置项
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};


