import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import TextPreview from '../common/TextPreview'
import Input from '../common/Input'
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
				<div className={styles.innerContainer}>
					<TextPreview
						text="Fusce nulla tortor, dapibus quis enim a,"
					/>
					<Input
						labelText="Stream address"
					/>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
