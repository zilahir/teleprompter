import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import test from './reducers/Test'
import segments from './reducers/segments'
import text from './reducers/text'

const rootReducer = combineReducers({
	test,
	segments,
	text,
})

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default configureStore
