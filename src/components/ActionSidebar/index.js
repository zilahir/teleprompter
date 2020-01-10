import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import TextPreview from '../common/TextPreview'
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
				<div>
					<TextPreview
						text="Fusce nulla tortor, dapibus quis enim a,"
					/>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
