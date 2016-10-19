# react-start-kit

react-start-kit是一个以react为起步的一整套客户端实现方案, 包括了webpack打包,开发环境启动服务工具webpack-dev-server,react状态管理库react-redux,react路由解决方案react-router,服务器端测试框架mocha以及客户端测试管理工具karma.
该项目采用ES6语法以及部分ES7语法,旨在对react以及react的周边库和工具有一个初步的了解.


## 起步

### Webpack

为了使前端代码能够支持ES6,部分ES7以及支持JSX语法,就需要使用webpack自动化工具对代码进行转码,[Webpack](https://github.com/ziyi2/react-start-kit/tree/master/Webpack)主要讲述如何开始起步一个react项目.

### Server

当我们在编写代码的时候,当然不希望编写了一小段代码想在浏览器端查看效果时,还需要每次手动使用webpack进行打包,[webpack-dev-server](https://github.com/ziyi2/react-start-kit/tree/master/Server)能够给我们启动一个开发环境的express服务,并监听文件的变化,从而实现自动打包功能.并且该服务的热部署功能可以使我们不用刷新浏览器便可看到我们代码生效的结果.

需要注意的是该服务只是用来让前端开发环境更方便,在真正的生产环境当然不需要再使用它了(而是部署一个我们自己的express服务).

### React-Redux

当项目组织过大,react的状态state会变得难以管理,甚至渲染出现问题时很可能不清楚是哪个state出了问题,而[react-redux](https://github.com/ziyi2/react-start-kit/tree/master/React-Redux)可以很好的帮助我们管理state,同时它还有一个重要的特点是可以同构应用,即让state在服务端和客户端同步管理.


### React-Router

[react-router](https://github.com/ziyi2/react-start-kit/tree/master/React-Router)是react路由解决方案,它可以保持UI和URL同步,需要注意的是这在单页应用中非常有用,它看起来我们的单页应用变得像多页应用一样丰富多彩.

### Mocha

[Mocha](https://github.com/ziyi2/react-start-kit/tree/master/Mocha)是运行在Node端的测试框架,可以用来对JavaScript代码进行单元测试,由于这里并没有服务端代码,所以这里只是讲述如何使用它,以及后面为客户端测试做预热.


### Karma

[Karma](https://github.com/ziyi2/react-start-kit/tree/master/Karma)是提供客户端测试环境的测试管理工具,可以配合Mocha等测试框架使用,这里主要讲述如何利用Karma进行前端代码的单元测试.



## 链接汇总

- [Webpack](https://github.com/ziyi2/react-start-kit/tree/master/Webpack)
- [Server](https://github.com/ziyi2/react-start-kit/tree/master/Server)
- [React-Redux](https://github.com/ziyi2/react-start-kit/tree/master/React-Redux)
- [React-Router](https://github.com/ziyi2/react-start-kit/tree/master/React-Router)
- [Mocha](https://github.com/ziyi2/react-start-kit/tree/master/Mocha)
- [Karma](https://github.com/ziyi2/react-start-kit/tree/master/Karma)

