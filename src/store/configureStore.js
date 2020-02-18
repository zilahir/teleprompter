import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import test from './reducers/Test'
import segments from './reducers/segments'
import text from './reducers/text'
import user from './reducers/user'

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	test,
	segments,
	text,
	user,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
