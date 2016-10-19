import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const enhancer = applyMiddleware(
    thunk
)

export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    const store = createStore(rootReducer, initialState, enhancer)

    // check if HMR is enabled
    if (module.hot) {
        console.log('module.hot...');
        // Enable Webpack hot module replacement for reducers
        // accept update of dependency
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default) // eslint-disable-line
        })
    }

    return store
}
