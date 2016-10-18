
var webpack = require('webpack'), //需要引入webpack
    path = require('path');

module.exports = function(config) {
  config.set({

    basePath: '',


    //使用的测试框架,这里当然是mocha
    //断言库选择chai
    frameworks: ['mocha','chai'],


    //需要加载进浏览器环境的测试文件
    files: [
      './test/**/*test.*'
    ],

    exclude: [
    ],


    //preprocess matching files before serving them to the browser
    //匹配路径的文件在加载入浏览器环境之前需要做的一些预处理
    //karma提供的预处理可以在这里查看https://npmjs.org/browse/keyword/karma-preprocessor
    //这里当然要加入webpack,在载入浏览器环境之前先进行打包处理
    preprocessors: {
      './test/**/*test.*': ['webpack']
    },


    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx']
      },

      module: {
        loaders: [{
          test: /\.js[x]?$/,
          exclude: [/node_modules/],
          loader: "babel-loader",
          query: {
            compact: false,
            presets: ['es2015', 'stage-3', 'react'],
            plugins: ['istanbul']
          }
        }]
      }
    },


    //这里主要配置测试报告
    //参数一只能填入两种情况: 'dots', 'progress'
    //更多可用报告查看:https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    //使用服务端口
    port: 9876,


    colors: true,


    logLevel: config.LOG_INFO,


    autoWatch: true,

    //使用的浏览器环境
    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity,


    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chrome-launcher"),
      require("karma-chai"),
      require("karma-coverage")
    ]

  })
}
