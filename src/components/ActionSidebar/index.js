import React, { useState, useEffect } from 'react'
import { Col } from 'react-grid-system'
import useSocket from 'use-socket.io-client'
import { useStore } from 'react-redux'
import uuidv4 from 'uuid'

import TextPreview from '../common/TextPreview'
import Input from '../common/Input'
import Button from '../common/Button'
import styles from './ActionSidebar.module.scss'
import { HELPER_SIDEBAR } from '../../utils/consts'
import Instruction from '../common/Instruction'

/**
* @author zilahir
* @function ActionSidebar
* */

const ActionSidebar = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [text, setText] = useState('')
	const [streamAddress, setStreamAddress] = useState('')
	const store = useStore()
	const [socket] = useSocket('http://localhost:5000')
	socket.connect()
	function togglePlaying() {
		setIsPlaying(!isPlaying)
		socket.emit('isPlaying', !isPlaying)
	}
	useEffect(() => store.subscribe(() => {
		const t = store.getState().text.text
		setText(t)
	}), [store, text])
	useEffect(() => {
		// socket.connect()
		setStreamAddress(uuidv4())
	}, [])
	return (
		<>
			<Col
				lg={3}
				className={styles.actionSidebarContainer}
			>
				<div className={styles.innerContainer}>
					<TextPreview
						text={text}
					/>
					<Input
						labelText="Stream address"
						isDisabled
						inheritedValue={`https://prompter.me/${streamAddress.split('-')[0]}`}
					/>
					<Input
						labelText="Remote control address"
						isDisabled
					/>
					<Instruction
						text={HELPER_SIDEBAR}
						hasPadding={false}
						maxWidth={250}
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
