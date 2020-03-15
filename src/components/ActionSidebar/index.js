import React, { useState, useEffect } from 'react'
import { Col } from 'react-grid-system'
import useSocket from 'use-socket.io-client'
import { useStore, useDispatch } from 'react-redux'

import TextPreview from '../common/TextPreview'
import Input from '../common/Input'
import Button from '../common/Button'
import styles from './ActionSidebar.module.scss'
import { HELPER_SIDEBAR, LINK } from '../../utils/consts'
import Instruction from '../common/Instruction'
import { copyPrompterObject } from '../../store/actions/prompter'

/**
* @author zilahir
* @function ActionSidebar
* */

const ActionSidebar = () => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [text, setText] = useState('')
	const [isAnimationStarted, toggleAnimation] = useState(false)
	const [scrollSpeed, setScrollSpeed] = useState(1)
	const [prompterSlug, setPrompterSlug] = useState(null)

	const store = useStore()
	const dispatch = useDispatch()
	const [socket] = useSocket('https://radiant-plains-03261.herokuapp.com/')
	socket.connect()

	function togglePlaying(bool) {
		setIsPlaying(!isPlaying)
		socket.emit('isPlaying', !isPlaying)
		if (!bool) {
			Promise.all([
				dispatch(copyPrompterObject(store.getState().text)),
			]).then(() => {
				setTimeout(() => {
					window.open(`/player/${prompterSlug}`, '_blank')
				}, 10)
			})
		}
	}

	useEffect(() => store.subscribe(() => {
		const t = store.getState().text.text
		const sp = store.getState().text.scrollSpeed
		if (typeof store.getState().userPrompters.prompterSlug !== 'undefined') {
			setPrompterSlug(store.getState().userPrompters.prompterSlug.split('-')[0])
		}
		setScrollSpeed(sp)
		setText(t)
	}), [store, text, scrollSpeed, prompterSlug])

	useEffect(() => {
		socket.connect()
	}, [])

	function testAnimation() {
		toggleAnimation(!isAnimationStarted)
	}

	return (
		<>
			<Col
				lg={3}
				className={styles.actionSidebarContainer}
			>
				<div className={styles.innerContainer}>
					<TextPreview
						text={text}
						isAnimationRunning={isAnimationStarted}
						scrollSpeed={15 - scrollSpeed}
					/>
					<div className={styles.testAnimation}>
						<Button
							type={LINK}
							onClick={() => testAnimation()}
							labelText={
								!isAnimationStarted ? 'test scroll' : 'stop scroll'
							}
						/>
					</div>
					<Input
						labelText="Stream address"
						isDisabled
						inheritedValue={`https://prompter.me/${prompterSlug || ''}`}
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
							onClick={() => togglePlaying(isPlaying)}
							labelText="Open"
						/>
					</div>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
