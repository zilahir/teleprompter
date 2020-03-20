import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import Player from '../components/Player'
import Main from '../components/Main'
import Mobile from '../components/Mobile'
import MobileController from '../components/MobileController'
import About from '../components/About'

/**
* @author
* @function App
* */

const App = () => (
	<div>
		<Router>
			<Route path="/" exact component={!isMobile ? Main : Mobile} />
			<Route path="/player/:slug" exact component={Player} />
			<Route path="/controller/:slug" exact component={MobileController} />
			<Route path="/about" exact component={About} />
		</Router>
	</div>
)

export default App
