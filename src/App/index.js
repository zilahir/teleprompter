import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import ReactGA from 'react-ga'

import Player from '../components/Player'
import Main from '../components/Main'
import Mobile from '../components/Mobile'
import MobileController from '../components/MobileController'
import Policy from '../components/Policy'
import About from '../components/About'
import Password from '../components/Password'
import { PLAYER, REMOTE, POLICY, ABOUT, FORGOTTEN_PW } from '../utils/consts'

/**
* @author
* @function App
* */

const App = () => {
	ReactGA.initialize('UA-163692111-1')
	return (
		<div>
			<Router>
				<Route path="/" exact component={!isMobile ? Main : Mobile} />
				<Route path={`/${PLAYER.toLowerCase()}/:slug`} exact component={Player} />
				<Route path={`/${REMOTE.toLowerCase()}/:slug`} exact component={MobileController} />
				<Route path={`/${POLICY.toLowerCase()}`} exact component={Policy} />
				<Route path={`/${ABOUT.toLowerCase()}`} exact component={About} />
				<Route path={`/${FORGOTTEN_PW.toLowerCase()}/:slug/:token`} exact component={Password} />
			</Router>
		</div>
	)
}

export default App
