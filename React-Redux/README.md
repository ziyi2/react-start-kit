# 3 React+Babel+Webpack+Server+Redux

## 3.1 安装

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


## 3.2 概述

Redux主要是用来管理React的state的,本身还是非常难以理解的,相对比较复杂,建议在看Redux之前先查看一下Flux的实现,关于Flux可以查看[Flux架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html).当然我自己也有一些关于Flux的Demo,具体查看[flux](https://github.com/ziyi2/rewatch/tree/master/client/javascript/flux-src/index).



### 3.3 数据流

Redux当然延续了Flux单向数据流的思想,下面是一张Flux的数据流示意图

/*
                 _________               ____________               ___________
                |         |             |            |             |           |
                | Action  |------------▶| Dispatcher |------------▶| callbacks |
                |_________|             |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼____
|         |◀----|  Action  |                                        |         |
| Web API |     | Creators |                                        |  Store  |
|_________|----▶|__________|                                        |_________|
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼____
                |   User       |         |   React   |              | Change  |
                | interactions |◀--------|   Views   |◀-------------| events  |
                |______________|         |___________|              |_________|
*/


Flux是怎么工作的呢?

- 1. 用户访问相应的视图组件
- 2. 视图组件中的`Web API`当然用来产生动作的,例如一些Click,Focus等事件可以用来产生动作
- 3. `Action Creators`当然是因为视图组件所引起的事件产生器
- 4. `Dispatcher`受到`Action`后,将相应的`Action`分发给`Store`,要求`Store`更新
- 5. `Store`更新后,发出一个change事件(注意Store只是存放state的副本,并不是真正的更新state)
- 6. 视图组件(`React Views`)收到change事件后,根据更新的副本(`Store`)更新state,触发视图的重新渲染
- 7. `User interactions`,用户当然又可以发起action请求了.

转了一个圈,简单来说就是发起一个action,然后根据action判断要更改的是哪个state,在发起一个更改state的消息,要更改state,先更改state的副本,然后视图组件又订阅了这个state的副本变化,最终修改state来触发视图数据更新后的渲染.
再次说下关于Flux可以查看[Flux架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html).当然我自己也有一些关于Flux的Demo,具体查看[flux](https://github.com/ziyi2/rewatch/tree/master/client/javascript/flux-src/index)

那么其实Redux的思想和Flux其实是差不多的.

## 3.4 基本概念

首先,Redux的设计核心和Flux一样是严格的单向数据流(其实就是转圈圈...), Redux将一个应用主要分成五个部分(官方好像还有一个middleware文件夹)

- actions(动作):  视图组件发出的消息(例如元素的Click事件)
- reducers(数据层): 根据actions分发的动作,触发相应的state改变,从而可以改变例如Click事件所在组件的视图重新渲染
- store(桥接): actions描述发生了什么,reducers根绝相应的action更新state, store负责把actions和reducers联系在一起,它是一个对象.\
- components(视图组件): 视图组件当然就是实际的组件,可以产生事件从而分发actions
- containers(容器组件): 控制视图组件可以读取state和分发actions的权限,容器组件和相应的视图组件一一对应

在查看接下来的内容说明时,建议先了解一下官方的中文版教程[redux-tutorial](https://github.com/react-guide/redux-tutorial-cn).

这五个文件夹怎么工作呢?

/*
                 _________               ____________               ___________
                |         |             |            |             |           |
                | Action  |------------▶| Dispatcher |------------▶| callbacks |
                |_________|             |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼____
|         |◀----|  Action  |                                        |         |
| Web API |     | Creators |                                        |  Store  |
|_________|----▶|__________|                                        |_________|
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼____
                |   User       |         |   React   |              | Change  |
                | interactions |◀--------|   Views   |◀-------------| events  |
                |______________|         |___________|              |_________|
*/

仍然是这张图? 在Flux中我们可以清晰的看到Dispatcher, callbacks以及Change events,但是在Redux中,这些工作都已经被隐藏掉了.

我们想象一下,最终变成了下面这张图


/*
                 _________                ____________               ___________
                |         |              |            |             |           |
                | actions  |------------▶| store      |------------▶| reducers  |
                |_________|              |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼________
|         |◀----|  Action  |                                        |              |
| Web API |     | Creators |                                        |  containers  |
|_________|----▶|__________|                                        |_____________ |
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼________
                |   User       |         |   React   |              |               |
                | interactions |◀--------|   Views   |◀-------------| components    |
                |______________|         |___________|              |_____________  |
*/




Redux是怎么工作的呢?(可能上面的图和下面的说明不是那么准确,但是说明了一个大致的构造)



### ActionCreator -> actions

查看`actions`文件下的一个action


```javascript

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'

export function increment() {
    return {
        type: INCREMENT_COUNTER
    }
}

```

其实如果只是这个函数的话,其实就是返回了一个对象,目前为止啥都没用,但是它已经走完了 ActionCreator -> actions的流程


### actions -> store -> reducers


接着我们发现要走 actions -> store 的流程了, 那么这个actions产生了之后, 我们如何分发这个actions呢, 这就需要store了.

但是store究竟是个什么东西呢, 在说这个流程之前我们先来说说store和reducers之前的关系,因为要分发store了嘛.


```javascript

//我们把redux的实例称为store,store的创建方式如下
//查看store文件夹下的configureStore文件,略有不同,不过没关系

import { createStore } from 'redux'
var store = createStore(() => {});      //createStore其实接收的是一个修改应用状态的函数,其实就是reducers

//store文件夹下的configureStore文件代码
import rootReducer from '../reducers'
const store = createStore(rootReducer, initialState, enhancer)  //后面两个参数暂时忽略

```


那么查看`reducers`文件夹的代码


```javascript

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter'

export default function counter(state = 0, action) {    //一个counter函数,初始state = 0
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1
        case DECREMENT_COUNTER:
            return state - 1
        default:
            return state
    }
}

```


先忽略文件夹中的其他代码吧,来我们让应用变得简单点


```javascript

import { createStore } from 'redux'

var counter = function(state=0, action) {   //state初始为0
     switch (action.type) {
            case INCREMENT_COUNTER:
                return state + 1
            case DECREMENT_COUNTER:
                return state - 1
            default:
                return state    //不管怎么样,一定要返回state
     }
}


var store = createStore(counter);


store.getState();   //获取了初始的state =  0

```


好了,说了这多, actions -> store 流程到底怎么走?

```javascript

import { createStore } from 'redux'



//reducer
var counter = function(state=0, action) {   //state初始为0
     switch (action.type) {
            case INCREMENT_COUNTER:
                return state + 1
            case DECREMENT_COUNTER:
                return state - 1
            default:
                return state    //不管怎么样,一定要返回state
     }
}

//store
var store = createStore(counter);



//action
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'

export function increment() {
    return {
        type: INCREMENT_COUNTER
    }
}


//action -> store
store.dispatch(increment());   //接收一个对象作为参数, dispatch看起来是不是和Dispatcher非常像?

//store -> reducers 这一步其实已经被封装而不可见了

store.getState();   //获取了动作之后的的state =  1

```

### reducers -> containers -> components

那么state是变化了,但是像Flux那样,视图组件总要有个订阅功能吧,订阅state的变化,然后更新视图,在Redux中,是这么干的


```javascript

import { createStore } from 'redux'



//reducer
var counter = function(state=0, action) {   //state初始为0
     switch (action.type) {
            case INCREMENT_COUNTER:
                return state + 1
            case DECREMENT_COUNTER:
                return state - 1
            default:
                return state    //不管怎么样,一定要返回state
     }
}

//store
var store = createStore(counter);



//action
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'

export function increment() {
    return {
        type: INCREMENT_COUNTER
    }
}


//action -> store
store.dispatch(increment());   //接收一个对象作为参数, dispatch看起来是不是和Dispatcher非常像?

//store -> reducers 这一步其实已经被封装而不可见了

store.getState();   //获取了动作之后的的state =  1

//store -> views
store.subscribe(function() {        //需要注意在我们的应用中并没有出现,是因为我们用容器组件来替代了这个功能
    // 在这里更新你的视图
})

```


## 3.5 小结

到这里,Redux的圈圈已经走完了,但是发现其实我们项目的代码并不是这样的?接下来的问题请自己查阅

- redux其实一个单独的应用,它不仅仅和react可以连接,还可以和其他界面库连接, redux和react怎么连接起来?
- 容器组件的功能是怎么实现的?
- reducers是如何拆分的?
- 异步actions是如何实现的?
- middleware功能如何实现?


## 3.6 参考链接

### Redux
- [Flux架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)
- [Redux中文文档](http://cn.redux.js.org/index.html)
- [redux](https://github.com/reactjs/redux)
- [redux-tutorial](https://github.com/react-guide/redux-tutorial-cn)
- [react-redux-tutorial](https://github.com/lewis617/react-redux-tutorial)