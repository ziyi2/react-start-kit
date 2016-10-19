import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Counter from './containers/Counter'

const store = configureStore()


ReactDOM.render(
    <Provider store={store}>
        <Counter />
    </Provider>,
  document.getElementById('app')
)
