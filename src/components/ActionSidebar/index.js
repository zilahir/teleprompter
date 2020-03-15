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
import { copyPrompterObject, createNewPrompter } from '../../store/actions/prompter'

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
	const [showUpdateBtn, toggleShowUpdateBtn] = useState(false)

	const store = useStore()
	const dispatch = useDispatch()
	const [socket] = useSocket('https://radiant-plains-03261.herokuapp.com/')
	socket.connect()

	function togglePlaying(bool) {
		setIsPlaying(!isPlaying)
		socket.emit('isPlaying', !isPlaying)
		const newPrompterObject = store.getState().text
		const { user } = store.getState().user
		const slug = store.getState().userPrompters.prompterSlug
		if (!bool) {
			const saveObject = {
				slug,
				text: newPrompterObject.text,
				userId: '5e63f4ba19a0555a4fbbe5da',
				projectName: `project_${slug}`,
				meta: {
					fontSize: newPrompterObject.fontSize,
					lineHeight: newPrompterObject.lineHeight,
					letterSpacing: newPrompterObject.letterSpacing,
					scrollWidth: newPrompterObject.scrollWidth,
					scrollSpeed: newPrompterObject.scrollSpeed,
				},
			}
			Promise.all([
				dispatch(copyPrompterObject(store.getState().text)),
				createNewPrompter(saveObject, user.accessToken),
				// TODO: change hardcoded user id fro user object
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
		const uBtn = store.getState().misc.showActiveBtn
		toggleShowUpdateBtn(uBtn)
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
						{
							!showUpdateBtn
								? (
									<Button
										onClick={() => togglePlaying(isPlaying)}
										labelText="Open"
									/>
								)
								: (
									<Button
										onClick={() => null}
										labelText="Update"
									/>
								)
						}
					</div>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
