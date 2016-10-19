# 3 React+Babel+Webpack+ESLint+Redux

```javascript
  npm install redux react-redux redux-thunk --save
```

模块说明:
- redux: redux模块
- react-redux: 绑定react和redux
- redux-thunk: 用来异步分发actions,例如ajax
- redux-logger: 这个非常有用,自行脑补


启动

```javascript
  npm start
```

Redux非常复杂,这里就不细说了,详情可以仔细阅读[Redux中文文档](http://cn.redux.js.org/index.html).需要清楚的是如下关系

| 文件夹        | 描述           |
| :------------- |:-------------|
| actions      | Action由组件中的事件来触发,主要是用来传递改变State Tree意愿(还没改变)的动作,它的下一步走向Reducer. |
| reducers      | Reducer主要是根据相应的actions来更新相应组件的State,需要注意的是Reducer可以拆分. |
| store | Store是把Action和Reducer联系在一起的对象,需要注意的是Redux应用只有一个store,store还可以控制异步actions. |
| containers | 存放容器组件,容器组件可以控制state和actions的分发,即控制state的数据流向,从而使组件的渲染被有效限制 |
| components | 具体的视图组件,接收containers的props分发state和actions,然后通过事件可以触发actions,从而触发视图重新渲染 |


## 参考链接

### Redux
- [Redux中文文档](http://cn.redux.js.org/index.html)
- [redux](https://github.com/reactjs/redux)
- [redux-tutorial](https://github.com/react-guide/redux-tutorial-cn)
- [react-redux-tutorial](https://github.com/lewis617/react-redux-tutorial)