import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'

import Player from '../components/Player'
import Main from '../components/Main'
import Mobile from '../components/Mobile'
import MobileController from '../components/MobileController'
import Policy from '../components/Policy'
import About from '../components/About'
import Password from '../components/Password'
import { PLAYER, REMOTE, POLICY, ABOUT, FORGOTTEN_PW, HOME } from '../utils/consts'

/**
* @author
* @function App
* */

const App = () => {
	ReactGA.initialize('UA-163692111-1', {
		debug: true,
	})
	ReactGA.pageview(`/${HOME}`)
	return (
		<div>
			<Router>
				<Helmet>
					<meta property="og:title" content="Prompter.me" />
					<meta property="og:type" content="website" />
					<meta name="apple-mobile-web-app-title" content="Prompter.me" />
					<meta property="og:image" content={`${process.env.PUBLIC_URL}/misc/prompterme-sharing.jpeg`} />
					<meta property="og:image:type" content="image/jpeg" />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<meta property="og:image:alt" content="Prompter.me is a free, open source teleprompter on the web." />
					<link rel="apple-touch-icon" href={`${process.env.PUBLIC_URL}/favicons/favicon-180.png`} />
				</Helmet>
				<Route path="/" exact component={!isMobile ? Main : Mobile} />
				<Route path={`/${PLAYER}/:slug`} exact component={Player} />
				<Route path={`/${REMOTE}/:slug`} exact component={MobileController} />
				<Route path={`/${POLICY}`} exact component={Policy} />
				<Route path={`/${ABOUT}`} exact component={About} />
				<Route path={`/${FORGOTTEN_PW}/:slug/:token`} exact component={Password} />
			</Router>
		</div>
	)
}

export default App
