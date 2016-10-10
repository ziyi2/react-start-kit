# react-start-kit

## 1 React+Babel+Webpack

### 1.1 安装React

```javascript
    npm install react react-dom --save
```

### 1.2 安装Babel6

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

### 1.3 安装Webpack

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


### 1.4 运行
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



## 参考链接

### Github

- [webpack-demos](https://github.com/ruanyf/webpack-demos)



