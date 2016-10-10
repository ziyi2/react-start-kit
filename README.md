# react-start-kit

## 1 React+Babel+Webpack

### 1.1 React

```javascript
    npm install react react-dom --save
```

### 1.2 Babel6

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

### 1.3 Webpack

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

## 2 React+Babel+Webpack+ESLint

### 2.1 webpack-dev-server

在开发模式中,使用`webpack-dev-server`是一个更好的选择,它将在[localhost:8080](localhost:8080)启动一个`express`静态资源web服务器，并且会以监听模式自动运行webpack,在浏览器打开[localhost:8080](localhost:8080)或 [localhost:8080/webpack-dev-server](localhost:8080/webpack-dev-server)可以浏览项目中的页面和编译后的资源输出，并且通过一个socket.io服务实时监听它们的变化并自动刷新页面

```javascript
    npm install webpack-dev-server --save-dev
```

在`package.json`文件中添加启动命令

```javascript
    "start": "webpack-dev-server --devtool source-map --inline --progress --colors --content-base build"
```

启动监听命令

```javascript
    npm start
```

查看打包结果

```javascript
   Hash: f594f03e2daaa05cb0df
   Version: webpack 1.13.2
   Time: 3079ms
           Asset     Size  Chunks             Chunk Names
       bundle.js  1.29 MB       0  [emitted]  main
   bundle.js.map  1.55 MB       0  [emitted]  main
   chunk    {0} bundle.js, bundle.js.map (main) 1.19 MB [rendered]
```

此时可以启动浏览器查看[localhost:8080](localhost:8080)

### 2.2 Hot Module Replacement

`HMR`即模块热部署,也就是说我们的修改后的代码不仅可以自动打包，而且浏览器不用完全刷新，只需要异步刷新，加载修改后部分代码即可，加载完成效果会马上反应在页面效果上。我们只需要在启动webpack-dev-server是添加--hot参数即可

```javascript
    webpack-dev-server --hot --inline
```
当然模块热部署会使`bundle`的文件变大.

### 2.3 ESLint and Airbnb's ESLint config

```javascript
    npm install eslint eslint-config-airbnb eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y --save-dev
```

添加`.eslintrc`文件和`.eslintignore`文件

```javascript
   {
     "env": {
       "node": true
     },
     "ecmaFeatures": {
       "jsx": true
     },
     "globals": {
       "React": true
     },
     "plugins": [
       "react"
     ],
     "extends": "airbnb",
     "rules": {
       "comma-dangle": 0,
       "no-console": 0,
       "id-length": 0,
       "react/prop-types": 0
     }
   }
```

```javascript
  build/**
  node_modules/**
  **/*.css
  **/*.html
```

添加命令

```javascript
  "lint": "eslint 'src/**/*.@(js|jsx)'",
```

启动检查

```javascript
  npm run lint
```


<p align="center">
 <img src="https://github.com/ziyi2/react-start-kit/blob/master/React_Babel_Webpack_ESLint/imgs/eslint.jpeg" alt="ESLint">
</p>

>注意: 在MAC下有效,但是Windows无效?

添加`pre-commit`模块,可以在`git commit`之前使用ESLint对编写代码作出规范校验,安装模块

```javascript
  npm install --save-dev precommit-hook
```

安装完该模块后,工程中会有如下变化
- 在当前工程下自动添加了`jshintrc`和`jshintignore`文件
- 在`package.json`中添加了`pre-commit`字段
- 在`package.json`中的`scripts`中添加了两个命令`lint`和`validate`(如果不存在)

`pre-commit`字段如下

```javascript
  "pre-commit": [
    "lint",
    "validate",
    "test"
  ]
```


可以删除`jshintrc`和`jshintignore`文件,因为检测使用的是ESLint,提交代码时如果`npm run lint`不通过

<p align="center">
 <img src="https://github.com/ziyi2/react-start-kit/blob/master/React_Babel_Webpack_ESLint/imgs/precommit.jpeg" alt="ESLint">
</p>

当然如果不想在提交之前执行不想要的命令,修改`pre-commit`字段如下

```javascript
  "pre-commit": [
    "lint"
  ]
```


## 参考链接

### Webpack
- [webpack-demos](https://github.com/ruanyf/webpack-demos)
- [webpack中文指南](http://webpackdoc.com/development.html)

### ESLint
- [ESLint](https://github.com/Jocs/ESLint_docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [react-babel-webpack-boilerplate](https://github.com/ruanyf/react-babel-webpack-boilerplate)
