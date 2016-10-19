# 4 React+Babel+Webpack+Server+Redux+Router

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


## 参考链接

### Router
- [React-Router入门教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)
- [React-Router中文文档](http://react-guide.github.io/react-router-cn/docs/Introduction.html)
- [react-router-tutorial](https://github.com/reactjs/react-router-tutorial/tree/master/lessons)
- [react-router-expamle](https://github.com/reactjs/react-router/tree/latest/examples)