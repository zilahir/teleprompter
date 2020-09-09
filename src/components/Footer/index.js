import React from 'react'
import { Row, Container, Col } from 'react-grid-system'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { github } from 'react-icons-kit/feather/github'

import styles from './Footer.module.scss'
import { Colors } from '../../utils/consts'

/**
* @author zilahir
* @function Footer
* */

const IconContainer = styled.div`
	color: ${props => props.color};
`

const Footer = () => (
	<footer className={styles.footerContainer}>
		<Container fluid>
			<Row
				align="center"
			>
				<Col lg={6}>
					<div className={styles.innerContainer}>
						<p>
							prompter.me
						</p>
						<p className={styles.purple}>
							<a
								rel="noopener noreferrer"
								target="_blank"
								href="https://www.netlify.com"
							>
								This site is powered by Netlify
							</a>
						</p>
					</div>
				</Col>
				<Col lg={6}>
					<ul>
						<li>
							<IconContainer
								color={Colors.purple}
							>
								<a href="https://github.com/zilahir/teleprompter">
									<Icon size="1.5em" icon={github} />
								</a>
							</IconContainer>
						</li>
					</ul>
				</Col>
			</Row>
		</Container>
	</footer>
)

export default Footer
