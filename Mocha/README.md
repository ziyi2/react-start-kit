# 5 React+Babel+Webpack+ESLint+Redux+Router+Mocha

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

### Mocha
- [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)