import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'
import { useHistory } from 'react-router'

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
	const history = useHistory()
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
					<div className={styles.playButtonContainer}>
						<Button
							onClick={() => history.push('/player')}
							labelText="play"
						/>
					</div>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
