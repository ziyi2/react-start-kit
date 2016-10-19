# 1 React+Babel+Webpack

## 1.1 React

安装`react`和`react-dom`模块

```javascript
    npm install react react-dom --save
```

## 1.2 Babel 6

安装使用`babel`会用到的模块,需要注意因为在`react`中会使用一些`es7`的特性,所以这里选用`stage-3`

```javascript
    npm install babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-3 --save-dev
```

>注意: `--save-dev`用在开发环境,`--save`用在生产环境.

同时创建`.babelrc`文件并且添加这三个`preset`

```javascript
   {
     "presets": ["es2015", "react", "stage-3"]
   }
```

Babel当然不能支持所有的ES6特性, 当然它需要一些`runtime`支持, 例如一些特定的ES6原生API,安装`babel-polyfill`模块并在文件的开头引入该模块便可以支持更多ES6原生的API.

```javascript
    npm install babel-polyfill --save
```

当使用Webpack打包`.js`文件时(文件如果不是单个), 重复的代码是不必要的, 以下插件能起到此类优化作用

```javascript
    npm install babel-runtime --save
    npm install babel-plugin-transform-runtime --save-dev
```

同时添加在`.babelrc`文件中添加插件设置

```javascript
   {
     "presets": ["es2015", "react", "stage-3"],
     "plugins": ["transform-runtime"]
   }
```

## 1.3 Webpack

```javascript
    npm install webpack --save-dev
```

安装一些`webpack loaders`

```javascript
    npm install babel-loader css-loader style-loader url-loader --save-dev
```

创建`webpack.config.js`文件


```javascript
    var webpack = require('webpack');
    var path = require('path');

    module.exports = {
        entry: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/App.jsx')
        ],
        resolve: {
            extensions: ["", ".js", ".jsx"]     //require的时候不需要加上文件扩展名
        },
        output: {
            path: __dirname + '/build',
            publicPath: '/',
            filename: 'bundle.js'
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
                    loader: 'babel'
                },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=8192'
                }
            ]
        }
    };
```


在`package.json`文件中添加启动命令

```javascript
     "build": "webpack"
```

如果不想每次修改模块后都重新编译，那么可以启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快

```javascript
     "build": "webpack --progress --colors --watch"
```



## 1.4 运行
源代码在`src`目录下,打包文件到`build`目录下,运行

```javascript
    npm run build
```

查看打包结果

```javascript
    Hash: d0d4d55fb0b5f49636f5
    Version: webpack 1.13.2
    Time: 2392ms
        Asset     Size  Chunks             Chunk Names
    bundle.js  1.05 MB       0  [emitted]  main
       [0] multi main 40 bytes {0} [built]
        + 559 hidden modules
```

>注意: 这里的`bundle.js`已经有1.05MB大小,明显需要优化处理.


这样,我们的第一章节的工作就做完了,这里主要实现了使用`webpack`来打包使用`es6`语法编写的`react`代码.如果不了解`react`和`es6`,可以查看参考文献.


## 1.5 参考链接

### React
- [react-demo](http://www.ziyi2.cn/2016/07/20/React-OverView/#more)
- [React入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

### Webpack
- [webpack-demo](https://github.com/ziyi2/webpack-demo)
- [webpack-demos](https://github.com/ruanyf/webpack-demos)
- [webpack中文指南](http://webpackdoc.com/development.html)

### ES6
- [ECMAScript 6](http://www.ziyi2.cn/2016/08/04/ECMAScript-6/#more)