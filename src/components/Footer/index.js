import React from 'react'
import { Row, Container, Col } from 'react-grid-system'

import styles from './Footer.module.scss'

/**
* @author zilahir
* @function Footer
* */

const Footer = () => (
	<footer className={styles.footerContainer}>
		<Container fluid>
			<Row>
				<Col lg={12}>
					<ul>
						<li>
							<p>
								lofasz
							</p>
						</li>
					</ul>
				</Col>
			</Row>
		</Container>
	</footer>
)

export default Footer
