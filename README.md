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

>Tip: 注意`--save-dev`用在开发环境,`--save`用在生产环境.

同时在根目录下创建`.babelrc`文件并且添加这三个`preset`

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








## 参考链接

### Github

- [webpack-demos](https://github.com/ruanyf/webpack-demos)



