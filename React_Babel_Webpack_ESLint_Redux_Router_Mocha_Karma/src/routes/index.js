import React from 'react'
import { Route, IndexRoute } from 'react-router'



//容器组件
import IndexContainer from '../containers/IndexContainer'
import HelloWorldContainer from '../containers/HelloWorldContainer'
import CounterContainer from '../containers/CounterContainer'


const routes = () => {

    //这里可以添加onEnter事件

    return(
        <Route path="/" component={IndexContainer}>
            <IndexRoute component={HelloWorldContainer} />
            <Route path="counter" component={CounterContainer} />
        </Route>
    )
};


export default routes