import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import styles from './ActionSidebar.module.scss'

/**
* @author zilahir
* @function ActionSidebar
* */

const ActionSidebar = () => {
	const store = useStore()

	return (
		<>
			<Col
				lg={3}
				className={styles.actionSidebarContainer}
			>
				<p>
					editorsidebar
				</p>
			</Col>
		</>
	)
}

export default ActionSidebar
