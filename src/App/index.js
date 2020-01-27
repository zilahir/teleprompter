import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Player from '../components/Player'
import Main from '../components/Main'

/**
* @author
* @function App
* */

const App = () => (
	<div>
		<Router>
			<Route path="/" exact component={Main} />
			<Route path="/player" exact component={Player} />
		</Router>
	</div>
)

export default App
