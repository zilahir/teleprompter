import React, { useState, useEffect } from 'react'
import { Col } from 'react-grid-system'
import classnames from 'classnames'
import { useSocket } from '@zilahir/use-socket.io-client'
import { useStore, useDispatch } from 'react-redux'
import Icon from 'react-icons-kit'
import { copy } from 'react-icons-kit/feather/copy'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import TextPreview from '../common/TextPreview'
import Input from '../common/Input'
import Button from '../common/Button'
import styles from './ActionSidebar.module.scss'
import { HELPER_SIDEBAR, LINK, INFOBOX_SIDEBAR, CREATE, OPEN } from '../../utils/consts'
import Instruction from '../common/Instruction'
import { copyPrompterObject, createNewPrompterNoAuth, updatePrompterNoAuth } from '../../store/actions/prompter'
import { apiEndpoints } from '../../utils/apiEndpoints'
import { toggleUpdateBtn } from '../../store/actions/misc'

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
	const [remoteAddress, setRemoteAddress] = useState(null)
	const [streamAddress, setStreamAddress] = useState(null)
	const [createLabelText, setCreateBtnLabelText] = useState(CREATE)

	const store = useStore()
	const dispatch = useDispatch()
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND)
	if (socket) {
		socket.connect()
	}

	function togglePlay() {
		window.open(`/player/${prompterSlug}`, '_blank')
	}

	function createPrompter(state) {
		if (state === OPEN) {
			togglePlay()
			return
		}
		setIsPlaying(!isPlaying)
		socket.emit('isPlaying', !isPlaying)
		const newPrompterObject = store.getState().text
		const slug = store.getState().userPrompters.prompterSlug
		const saveObject = {
			slug,
			text: newPrompterObject.text,
			projectName: `project_${slug}`,
			meta: {
				fontSize: newPrompterObject.fontSize,
				lineHeight: newPrompterObject.lineHeight,
				letterSpacing: newPrompterObject.letterSpacing,
				scrollWidth: newPrompterObject.scrollWidth,
				scrollSpeed: newPrompterObject.scrollSpeed,
				isFlipped: newPrompterObject.isFlipped,
			},
		}
		Promise.all([
			dispatch(copyPrompterObject(store.getState().text)),
			createNewPrompterNoAuth(saveObject, apiEndpoints.newPrompterWithoutAuth),
		]).then(() => {
			setTimeout(() => {
				setCreateBtnLabelText(OPEN)
			}, 100)
		})
	}

	function updatePrompter() {
		const newPrompterObject = store.getState().text
		const slug = store.getState().userPrompters.prompterSlug
		const updateObject = {
			slug,
			text: newPrompterObject.text,
			projectName: `project_${slug}`,
			meta: {
				fontSize: newPrompterObject.fontSize,
				lineHeight: newPrompterObject.lineHeight,
				letterSpacing: newPrompterObject.letterSpacing,
				scrollWidth: newPrompterObject.scrollWidth,
				scrollSpeed: newPrompterObject.scrollSpeed,
				isFlipped: newPrompterObject.isFlipped,
			},
		}
		Promise.all([
			dispatch(copyPrompterObject(store.getState().text)),
			updatePrompterNoAuth(updateObject, apiEndpoints.newPrompterWithoutAuth),
		]).then(() => {
			toggleUpdateBtn(false)
			socket.emit('updatePrompter', updateObject)
		})
	}

	useEffect(() => store.subscribe(() => {
		const t = store.getState().text.text
		const sp = store.getState().text.scrollSpeed
		const uBtn = store.getState().misc.showActiveBtn
		toggleShowUpdateBtn(uBtn)
		if (typeof store.getState().userPrompters.prompterSlug !== 'undefined') {
			const slug = store.getState().userPrompters.prompterSlug
			setPrompterSlug(slug)
			setStreamAddress(`prompter.me/player/${slug}`)
			setRemoteAddress(`prompter.me/remote/${slug}`)
		}
		setScrollSpeed(sp)
		setText(t)
	}), [store, text, scrollSpeed, prompterSlug])

	function testAnimation() {
		toggleAnimation(!isAnimationStarted)
	}

	function copyValue(whichValue) {
		switch (whichValue) {
		case 'stream':
			setStreamAddress('copied')
			setTimeout(() => {
				setStreamAddress(`prompter.me/player/${prompterSlug}`)
			}, 2000)
			break
		case 'remote':
			setRemoteAddress('copied')
			setTimeout(() => {
				setRemoteAddress(`prompter.me/remote/${prompterSlug}`)
			}, 2000)
			break
		default:
			return true
		}
		return true
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
						scrollSpeed={10 - scrollSpeed}
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
						inheritedValue={streamAddress || ''}
						inputClassName={classnames(
							createLabelText !== OPEN ? styles.addressInput : null,
						)}
					>
						<CopyToClipboard
							onCopy={() => copyValue('stream')}
							text={`prompter.me/player/${prompterSlug || ''}`}
						>
							<div
								className={styles.copyIcon}
								role="button"
							>
								<Icon icon={copy} size="1em" />
							</div>
						</CopyToClipboard>
					</Input>
					<Input
						labelText="Remote phone address"
						inheritedValue={remoteAddress || ''}
						isDisabled
						inputClassName={classnames(
							createLabelText !== OPEN ? styles.addressInput : null,
						)}
					>
						<CopyToClipboard
							onCopy={() => copyValue('remote')}
							text={`prompter.me/remote/${prompterSlug || ''}`}
						>
							<div
								className={styles.copyIcon}
								role="button"
							>
								<Icon icon={copy} size="1em" />
							</div>
						</CopyToClipboard>
					</Input>
					<Instruction
						text={HELPER_SIDEBAR}
						hasPadding={false}
						maxWidth={250}
						type={INFOBOX_SIDEBAR}
						noHide
					/>
					<p className={styles.about}>
						<a href="/about">About Prompter.me</a>
					</p>
					<div className={styles.playButtonContainer}>
						{
							showUpdateBtn
								? (
									<Button
										onClick={() => updatePrompter()}
										labelText="Update"
										buttonClass={styles.updateBtn}
										isNegative
									/>
								)
								: null
						}
						<Button
							onClick={() => createPrompter(createLabelText)}
							labelText={createLabelText}
							buttonClass={styles.playBtn}
						/>
					</div>
				</div>
			</Col>
		</>
	)
}

export default ActionSidebar
