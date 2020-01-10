import React from 'react'
import { Row, Container } from 'react-grid-system'

import EditorSidebar from '../EditorSidebar'
import ActionSidebar from '../ActionSidebar'
import Preview from '../Preview'
import styles from './Main.module.scss'

/**
* @author zilahir
* @function Main
* */

const Main = () => (
	<div className={styles.mainContainer}>
		<Container
			fluid
		>
			<Row>
				<EditorSidebar />
				<Preview />
				<ActionSidebar />
			</Row>
		</Container>
	</div>
)

export default Main
