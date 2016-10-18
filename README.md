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
当然模块热部署会使`bundle`的文件变大. 还有另外一种方法进行热部署就是修改`webpack.config.json`


```javascript
    var webpack = require('webpack');
    var path = require('path');
    var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件

    module.exports = {
      ...
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })     //自动打开浏览器
      ]
    };
```




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

如果命令通过
<p align="center">
 <img src="https://github.com/ziyi2/react-start-kit/blob/master/React_Babel_Webpack_ESLint/imgs/precommit-2.jpeg" alt="ESLint">
</p>

当然如果不想在提交之前执行不想要的命令,修改`pre-commit`字段如下

```javascript
  "pre-commit": [
    "lint"
  ]
```

## 3 React+Babel+Webpack+ESLint+Redux

```javascript
  npm install redux react-redux redux-thunk --save
```

启动

```javascript
  npm start
```

详情可以仔细阅读[Redux中文文档](http://cn.redux.js.org/index.html).需要清楚的是如下关系

| 文件夹        | 描述           |
| :------------- |:-------------|
| actions      | Action由组件中的事件来触发,主要是用来传递改变State Tree意愿(还没改变)的动作,它的下一步走向Reducer. |
| reducers      | Reducer主要是根据相应的actions来更新相应组件的State,需要注意的是Reducer可以拆分. |
| store | Store是把Action和Reducer联系在一起的对象,需要注意的是Redux应用只有一个store,store还可以控制异步actions. |
| containers | 存放容器组件,容器组件可以控制state和actions的分发,即控制state的数据流向,从而使组件的渲染被有效限制 |
| components | 具体的视图组件,接收containers的props分发state和actions,然后通过事件可以触发actions,从而触发视图重新渲染 |

## 4 React+Babel+Webpack+ESLint+Redux+Router

```javascript
  npm install history react-router --save
```

启动

```javascript
  npm start
```

详情可以仔细阅读[react-router-tutorial](https://github.com/reactjs/react-router-tutorial/tree/master/lessons)和[React-Router中文文档](http://react-guide.github.io/react-router-cn/docs/Introduction.html).

需要注意的是在刷新页面[http://localhost:8080/counter](http://localhost:8080/counter)时会向服务器发送`/counter`的`GET`请求,由于这里使用`webpack-dev-server`简单开启了一个`express`服务,但是没有提供`/counter`接口,所以会报错.

那么如何解决这个问题,有两种方法

- 使用同构Redux和Router的方式,采用服务器端渲染,详情可查看[server-render](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/13-server-rendering)和[React+Redux同构应用开发](http://www.tuicool.com/articles/jYVZb2).
- 发送任何路由请求服务器端始终返回`/`路径的渲染,也就是始终渲染`index.html`,`react-router`的工作仅限于客户端

如果采用第二种方法(这里拿`webpack-dev-server`来说,真正开发的时候当然是自己起一个express服务喽)
- 在开发环境,使`webpack-dev-server`始终返回`index.html`
- 在生产环境,使我们的HTTP服务例如`Nignx`始终返回`index.html`

在`package.json`添加`--history-api-fallback`到`start`命令

```javascript
  "start": "webpack-dev-server --devtool source-map --inline --progress --colors --history-api-fallback --content-base build"
```

这时候如果重启服务再刷新,就不会说路由找不到了.


## 5 React+Babel+Webpack+ESLint+Redux+Router+Mocha

`Mocha`是JavaScript的单元测试框架,`Chai`是断言库.`Mocha`是运行在Node环境的,在进行express端(服务端)测试时候使用`Mocha`测试框架是非常高效的一个选择

```javascript
  npm install mocha chai --save-dev
```

由于这里没有使用自己创建的express服务,用了`webpack-dev-server`,所以没法对服务器端代码进行单元测试,这里简单的模拟一个测试环境,具体详细看`test`目录

在`package.json`文件中添加测试命令

```javascript
 "test": "mocha ./test/**/*.test.js"
```
运行测试命令

```javascript
 npm run test
```

如下结果表明测试成功

```javascript
   add function test
     √ 5+5=10?


   1 passing (6ms)
```

如果需要测试es6代码,则只需要修改测试命令

```javascript
 "test": "mocha ./test/**/*.test.js --compilers js:babel-core/register --reporter mochawesome"
```

当然测试文件一多,这种查看方式就会变得非常烦躁,此时可以使用浏览器页面产生报告的形式

```javascript
   npm install mochawesome --save-dev
```

修改测试命令

```javascript
 "test": "mocha ./test/**/*.test.js --compilers js:babel-core/register --reporter mochawesome"
```

具体可详细查看[测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)






## 参考链接

### React
- [react-demo](http://www.ziyi2.cn/2016/07/20/React-OverView/#more)
- [React入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)


### Webpack
- [webpack-demo](https://github.com/ziyi2/webpack-demo)
- [webpack-demos](https://github.com/ruanyf/webpack-demos)
- [webpack中文指南](http://webpackdoc.com/development.html)
- [Hot Module Replacement](https://github.com/webpack/docs/wiki/hot-module-replacement)
- [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)

### Babel
- [ECMAScript 6](http://www.ziyi2.cn/2016/08/04/ECMAScript-6/#more)

### ESLint
- [ESLint](https://github.com/Jocs/ESLint_docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [react-babel-webpack-boilerplate](https://github.com/ruanyf/react-babel-webpack-boilerplate)

### Redux
- [Redux中文文档](http://cn.redux.js.org/index.html)
- [redux](https://github.com/reactjs/redux)
- [redux-tutorial](https://github.com/react-guide/redux-tutorial-cn)
- [react-redux-tutorial](https://github.com/lewis617/react-redux-tutorial)

### Router
- [React-Router入门教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)
- [React-Router中文文档](http://react-guide.github.io/react-router-cn/docs/Introduction.html)
- [react-router-tutorial](https://github.com/reactjs/react-router-tutorial/tree/master/lessons)
- [react-router-expamle](https://github.com/reactjs/react-router/tree/latest/examples)

### Mocha
- [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
