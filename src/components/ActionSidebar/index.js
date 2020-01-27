import React, { useState } from 'react'
import { Col } from 'react-grid-system'
import io from 'socket.io-client'


import TextPreview from '../common/TextPreview'
import Input from '../common/Input'
import Button from '../common/Button'
import styles from './ActionSidebar.module.scss'

/**
* @author zilahir
* @function ActionSidebar
* */

const ActionSidebar = () => {
	const [isPlaying, setIsPlaying] = useState(false)

	const socket = io.connect('http://localhost:5000')

	function togglePlaying() {
		setIsPlaying(!isPlaying)
		socket.emit('isPlaying', isPlaying)
	}
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
							onClick={() => togglePlaying()}
							labelText={!isPlaying ? 'play' : 'stop'}
						/>
					</div>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
