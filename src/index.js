import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { store, persistor } from './store/configureStore'

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<DndProvider backend={HTML5Backend}>
				<App />
			</DndProvider>
		</PersistGate>
	</Provider>,
	document.getElementById('root'),
)

serviceWorker.unregister()
