import React from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Row, Container, Col } from 'react-grid-system'
import CloseIcon from '@material-ui/icons/Close'

import styles from '../Policy/Policy.module.scss'
import { ABOUT } from '../../utils/consts'

/**
* @author zilahir
* @function About
* */

const About = ({
	onClose,
}) => {
	ReactGA.pageview(`${ABOUT}`)
	return (
		<div className={classnames(
			styles.aboutWrapper,
			styles.about,
		)}
		>
			<Container
				fluid
			>
				<Row>
					<Col
						className={styles.middle}
						lg={12}
					>
						<div className={styles.closeBtnContainer}>
							<button
								type="button"
								onClick={onClose}
								className={styles.closeBtn}
							>
								<CloseIcon htmlColor="#ffffff" />
							</button>
						</div>
						<div className={styles.textContainer}>
							<h1 className={styles.title}>
								What is Prompter.me?
							</h1>
							<p>
								Prompter.me is a free, <a href="https://github.com/zilahir/teleprompter">open source</a> teleprompter on the web. Using it doesn&apos;t
								require you to download anything or to sign up for anything.
								It was made to give content creators an actually useful free teleprompter,
								which would allow them to use it on their own without any additional apps or hacks.
								After all, a lot of video content creators out there are one-person operations,
								and we know using a prompter without help can be a real pain in the tuchus.
							</p>
							<h1>
								Prompter.me was designed by Mikko Oittinen and developed by Richard Zilahi.
							</h1>
							<p>
								Mikko is a Finnish designer and content creator, who knows the pain of using
								bad prompters all too well. Mikko is a graphic designer by trade, and you
								canlook at (and buy) some of his work at <a href="https://clubcamomile.com/">Club Camomile</a>, an online store for
								sustainable and ethical print streetwear he co-founded. For his occasional videos
								(which almost always utilize teleprompters), check out his YouTube channel
								<a href="https://www.youtube.com/channel/UChUl9DYGrz2rQ4avj12Dm3Q">Expert Opinion</a>.
							</p>
							<p>
								Richard is a fullstack developer originally from Hungary,
								now living in Finland. Richard is enthusiastic about modern stacks,
								clean code and open source technology. Interested in big
								data and deep data analysis.
								Richard is the co-host of the
								podcast &quot;Szauna Szenátus&quot;, in Hungarian language.
								Check out some of Richard&apos;s work on his <a href="https://github.com/zilahir">GitHub page</a> and his <a href="https://richardzilahi.hu">website</a>.
							</p>
							<h1>
								Legal stuff
							</h1>
							<p>
								Read our <a href="/policy">privacy policy</a>.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

About.propTypes = {
	onClose: PropTypes.func.isRequired,
}

export default About
