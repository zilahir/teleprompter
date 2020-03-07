import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import segments from './reducers/segments'
import text from './reducers/text'
import user from './reducers/user'
import userPrompters from './reducers/prompter'

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	segments,
	text,
	user,
	userPrompters,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)
