# 2 React+Babel+Webpack+Server

## 2.1 webpack-dev-server

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

## 2.2 Hot Module Replacement

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




## 2.3 ESLint and Airbnb's ESLint config (这一步在Window环境下省略吧,亲测MAC环境无问题)

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
 <img src="https://github.com/ziyi2/react-start-kit/blob/master/Server/imgs/eslint.jpeg" alt="ESLint">

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
 <img src="https://github.com/ziyi2/react-start-kit/blob/master/Server/imgs/precommit.jpeg" alt="ESLint">
</p>

如果命令通过
<p align="center">
 <img src="https://github.com/ziyi2/react-start-kit/blob/master/Server/imgs/precommit-2.jpeg" alt="ESLint">
</p>

当然如果不想在提交之前执行不想要的命令,修改`pre-commit`字段如下

```javascript
  "pre-commit": [
    "lint"
  ]
```

## 2.4 小结


这一章节主要是启动一个`express`服务,自动监听并热部署我们的`react`代码,这样的话不能每次重新`webpack`手动打包.


## 2.5 参考链接

### Webpack
- [Hot Module Replacement](https://github.com/webpack/docs/wiki/hot-module-replacement)
- [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)

### ESLint
- [ESLint](https://github.com/Jocs/ESLint_docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [react-babel-webpack-boilerplate](https://github.com/ruanyf/react-babel-webpack-boilerplate)

