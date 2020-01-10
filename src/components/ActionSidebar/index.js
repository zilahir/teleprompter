import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import TextPreview from '../common/TextPreview'
import Input from '../common/Input'
import Button from '../common/Button'
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
					<Input
						labelText="Remote control address"
					/>
					<div className={styles.playButtonContaine}>
						<Button
							onClick={() => alert("lofasz")}
							labelText="play"
						/>
					</div>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
