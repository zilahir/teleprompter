import React from 'react'
import { Route, HashRouter } from 'react-router-dom'

import Player from '../components/Player'
import Main from '../components/Main'

/**
* @author
* @function App
* */

const App = () => (
	<div>
		<HashRouter>
			<Route path="/" exact component={Main} />
			<Route path="/player" exact component={Player} />
		</HashRouter>
	</div>
)

export default App
