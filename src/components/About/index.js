import React from 'react'
import { Row, Container, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'

import styles from '../Policy/Policy.module.scss'
import Button from '../common/Button'

/**
* @author zilahir
* @function About
* */

const About = () => {
	const history = useHistory()
	return (
		<div className={styles.aboutWrapper}>
			<Container
				fluid
			>
				<Row>
					<Col className={styles.dark} lg={3} />
					<Col className={styles.middle} lg={6}>
						<Button
							labelText="Back"
							onClick={() => history.goBack()}
						/>
						<div className={styles.textContainer}>
							<h1>
								What is Prompter.me?
							</h1>
						</div>
					</Col>
					<Col className={styles.dark} lg={3} />
				</Row>
			</Container>
		</div>
	)
}

export default About
