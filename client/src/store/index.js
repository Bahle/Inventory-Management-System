/* import { createStore, combineReducers } from 'redux';
import { products, info } from './reducers';

const store = createStore(
	combineReducers({ products, info })
)
console.log( store.getState() );

store.subscribe(() =>
	console.log('product count:', store.getState().products.length)
)

export default store; */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { products, info } from './reducers'

let stateData = {} //from '../../data/initialState'

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}

const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({products, info}), {}
        /* no need for persistence (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            stateData*/
    )

export default storeFactory