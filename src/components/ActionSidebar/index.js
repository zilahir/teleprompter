import React, { useState, useEffect } from 'react'
import { Col } from 'react-grid-system'
import useSocket from 'use-socket.io-client'


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

	const [socket] = useSocket('http://localhost:5000')
	function togglePlaying() {
		setIsPlaying(!isPlaying)
		socket.emit('isPlaying', !isPlaying)
	}
	useEffect(() => {
		socket.connect()
	}, [])
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
