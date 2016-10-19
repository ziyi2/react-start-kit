# 6 React+Babel+Webpack+Server+Redux+Router+Mocha+Karma

之前说了`Mocha`是运行在Node端的,那么如果是浏览器端环境的测试,是不是也可以使用`Mocha`呢,答案当然是肯定的,需要加载`jsdom`模块,但是这里我们推荐使用`karma`测试框架

那么`Karma,Mocha,Chai`之间是什么关系呢?

- Karma: 启动器,测试管理工具,提供浏览器端测试环境,驱动Mocha测试框架测试
- Mocha: 测试框架,配合Chai断言库使用效果极佳(当然也可以配合其他断言库)
- Chai:  断言库

安装模块

需要注意的是`Karma`在这里是一个测试管理工具,`Mocha`是一个测试框架已经熟悉了,但是如果要让这个测试框架可以跑在浏览器端的环境,那么就需要`Karma`了.为了通过`karma`来驱动`mocha`进行单元测试,需要安装`karma-mocha`,`karma-chai`模块,这两个模块依赖`mocha`和`chai`模块.


```javascript
   npm install karma karma-mocha karma-chai karma-chrome-launcher karma-coverage karma-webpack  --save-dev
```
- karma: 测试管理工具
- karma-mocha: 驱动mocha测试
- karma-chai: 驱动断言库
- karma-chrome-launcher: 测试的浏览器环境
- karma-webpack: 驱动webpack,支持es6,react测试
- karma-coverage: 用于生成测试覆盖率报告

使用如下命令产生配置文件`karma.config.js`

```javascript
   karma init
```
过程类似于`npm init`

```javascript
   Which testing framework do you want to use ?
   Press tab to list possible options. Enter to move to the next question.
   > mocha

   Do you want to use Require.js ?
   This will add Require.js plugin.
   Press tab to list possible options. Enter to move to the next question.
   > no

   Do you want to capture any browsers automatically ?
   Press tab to list possible options. Enter empty string to move to the next question.
   > Chrome

   What is the location of your source and test files ?
   You can use glob patterns, eg. “js/.js” or “test/**/Spec.js”.
   Enter empty string to move to the next question.
   > “test/**/*test.js”
   01 09 2016 16:43:20.743:WARN [init]: There is no file matching this pattern.

   >

   Should any of the files included by the previous patterns be excluded ?
   You can use glob patterns, eg. “*/.swp”.
   Enter empty string to move to the next question.
   >

   Do you want Karma to watch all the files and run the tests on change ?
   Press tab to list possible options.
   > yes
```

我们稍微做修改,由于我们的前端代码需要支持`ES6`和检测`JSX`格式,需要安装`karma-webpack`,这个就不需要解释了把

```javascript
   npm install karma-webpack --save-dev
```

配置文件


```javascript

var webpack = require('webpack'), //需要引入webpack
    path = require('path');

module.exports = function(config) {
  config.set({

    //...省略


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
            presets: ['es2015', 'stage-3', 'react']
          }
        }]
      }
    },


    //...省略


    plugins: [
      require("karma-webpack")      //需要加入的插件
    ]

  })
}

```

当然我们也想生成测试覆盖率报告,这时需要安装`karma-coverage`模块,但是需要注意的是在统计覆盖率时我们当然是要统计未被webpack打包之前的文件的覆盖率,所以配置如下

```javascript


module.exports = function(config) {
  config.set({

    //...省略


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
            //这个模块就是用来提供未被webpack打包之前的测试覆盖率统计
            //npm install babel-plugin-istanbul --save-dev
            plugins: ['istanbul']
          }
        }]
      }
    },


    //这里主要配置测试报告
    //参数一只能填入两种情况: 'dots', 'progress'
    //更多可用报告查看:https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],

    //...省略

    plugins: [
      require("karma-coverage")      //需要加入的插件
    ]

  })
}

```

当然还需要在`.babelrc`(之前测试覆盖率一直不准,主要可能还是这里没添加`istanbul`插件的原因吧)配置一下插件


```javascript
   {
     "presets": ["es2015", "react", "stage-3"],
     "plugins": ["transform-runtime","istanbul"]    //放入istanbul插件
   }
```



最终生成的配置文件`karma.config.js`


```javascript

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
      //'./src/**/*.js': ['coverage'],
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
            presets: ['es2015'],
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
      require("karma-webpack"),     //注意这个需要使用require,不然会报错
      require("karma-mocha"),
      require("karma-chrome-launcher"),
      require("karma-chai"),
      require("karma-coverage")
    ]

  })
};

```

在`package.json`文件中添加测试命令


```javascript
    "test-client": "karma start"
```
启动测试即可,测试覆盖率报告默认会在当前目录下创建`coverage`文件,在浏览器端查看`index.html`即可.


## 参考链接

### Karma
- [karma,webpack](http://www.tuicool.com/articles/jMvmEzI)
- [karma,coverage](http://www.jianshu.com/p/6726c0410650)