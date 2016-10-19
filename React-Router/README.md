# 4 React+Babel+Webpack+Server+Redux+Router

## 4.1 安装


```javascript
  npm install history react-router --save
```

启动

```javascript
  npm start
```



## 4.2 概述

react-router是react路由解决方案,它可以保持UI和URL同步,需要注意的是这在单页应用中非常有用,它看起来我们的单页应用变得像多页应用一样丰富多彩.
需要注意的是react-router应用的强大之处是你点击的任何路由是不会向服务端发起GET请求的,这和普通的多页应用是有一定区别的,除非你刷新浏览器,所以如果是小型的多页应用,你点击一个链接导航,就会发起一个HTTP请求重新渲染当前页,有了react-router就可以减少HTTP请求啦.
当然,缺点就是如果你的单页应用非常大,第一次加载可能会有很大的延迟(毕竟你把所有的视图都加载进来了,然后只是根据react-router在展示不同的组件).

基础知识可以查看[React-Router入门教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu).

## 4.3 代码详解

在Redux中我们详细叙述了Redux的原理,Router的应用其实就非常简单.

查看`routes`文件夹

```javascript

//redux中的容器组件
import IndexContainer from '../containers/IndexContainer'
import HelloWorldContainer from '../containers/HelloWorldContainer'
import CounterContainer from '../containers/CounterContainer'

//返回一个函数,其实就是返回路由组件
const routes = () => {
    return(
        <Route path="/" component={IndexContainer}>
            <IndexRoute component={HelloWorldContainer} />
            <Route path="counter" component={CounterContainer} />
        </Route>
    )
};

```


查看`App.jsx`文件


```javascript

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes()}      //添加路由组件
        </Router>
    </Provider>,
  document.getElementById('app')
);

```

那么问题来了,为什么要单独开一个`routes`文件夹,这在同构开发(服务端渲染)的时候非常有用.

## 4.4 刷新问题

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

>注意: 如果是自己开启的express服务,当然要自己添加代码手动处理请求问题.



## 4.5 参考链接

### Router
- [React-Router入门教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)
- [React-Router中文文档](http://react-guide.github.io/react-router-cn/docs/Introduction.html)
- [react-router-tutorial](https://github.com/reactjs/react-router-tutorial/tree/master/lessons)
- [react-router-expamle](https://github.com/reactjs/react-router/tree/latest/examples)