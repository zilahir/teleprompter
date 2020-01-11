import React, { useState, useRef, useEffect } from 'react'
import screenfull from 'screenfull'
import { useStore } from 'react-redux'
import { Button, FormControlLabel, Switch, TextField } from '@material-ui/core'
import { Description, FastForward, Fullscreen, SwapHoriz, TextFields } from '@material-ui/icons'

import Slider from '../common/Slider'
import TextScroller from '../TextScroller'
import styles from './Player.module.scss'

/**
* @author zilahir
* @function Player
* */

const Player = () => {
	const [text, setText] = useState('')
	const [scrollSpeed, setScrollSpeed] = useState(0)
	const [fontSize, setFontSize] = useState(1)
	const [flipX, setFlipX] = useState(false)
	const ScrollerRef = useRef(null)
	const store = useStore()
	function onFullScreenButtonClick() {
		if (screenfull.enabled) {
			screenfull.request()
		}
	}
	useEffect(() => store.subscribe(() => {
		const value = store.getState().text.text
		setText(value)
	}), [store])

	function handleScrollSpeedChange(value) {
		setScrollSpeed(value)
	}
	function handleFontSizeChange(value) {
		setFontSize(value)
	}
	function onFlipXSwitchChange(isChecked) {
		setFlipX(isChecked.target.checked)
	}
	function handleStart() {
		ScrollerRef.current.scroll()
	}
	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<div className={styles.controls}>
					<FormControlLabel
						control={(
							<Slider
								min={0}
								max={1}
								value={scrollSpeed}
								onChange={(event, value) => handleScrollSpeedChange(event, value)}
							/>
						)}
						label={<FastForward />}
					/>
					<FormControlLabel
						control={(
							<Slider
								min={0}
								max={1}
								value={fontSize}
								onChange={(event, value) => handleFontSizeChange(event, value)}
							/>
						)}
						label={(
							<TextFields
								style={{ transform: 'scaleX(-1)' }}
							/>
						)}
					/>
					<FormControlLabel
						control={(
							<Switch
								onChange={e => onFlipXSwitchChange(e)}
							/>
						)}
						label={<SwapHoriz />}
					/>
					<Button
						onClick={() => handleStart()}
						variant="raised"
					>
							Start
					</Button>
					<Button
						onClick={() => onFullScreenButtonClick()}
						size="small"
						variant="raised"
					>
						<Fullscreen />
					</Button>
				</div>
			</header>
			<TextScroller
				ref={ScrollerRef}
				text={text}
				fontSize={`${(6 * fontSize) + 2}em`}
				flipX={flipX}
				scrollDurationLine={8000 * (1 - scrollSpeed) + 192}
			/>
		</div>
	)
}

export default Player
