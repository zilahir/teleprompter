import React, { useState } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { Col } from 'react-grid-system'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

import SliderAlt from '../common/SliderAlt'
import Selector from '../common/Selector'
import Logo from '../common/Logo'
import { scrollWidthSettngs } from '../../utils/consts'
import { SET_FONT_SIZE, SET_LINE_HEIGHT, SET_LETTER_SPACING, SET_SCROLL_SPEED } from '../../store/actions/actionTypes'
import styles from './EditorSidebar.module.scss'
import './Toggle.scss'
import { toggleMirror } from '../../store/actions/text'

/**
* @author zilahir
* @function EditorSidebar
* */

const EditorSidebar = () => {
	const [isFlipped, setFlipped] = useState(false)
	const store = useStore()
	const dispatch = useDispatch()
	function handleFlip(boolean) {
		dispatch(toggleMirror(boolean.target.checked))
		setFlipped(boolean.target.checked)
	}
	return (
		<>
			<Col
				lg={3}
				className={styles.editorSidebarContainer}
			>
				<div className={styles.innerContainer}>
					<Logo />
					<SliderAlt
						labelText="Text size"
						sliderName={SET_FONT_SIZE}
						initialValue={store.getState().text.fontSize}
						maxValue={10}
						step={1}
					/>
					<SliderAlt
						labelText="Letter spacing"
						sliderName={SET_LETTER_SPACING}
						initialValue={store.getState().text.letterSpacing}
						minValue={0}
						maxValue={2}
						step={0.01}
					/>
					<SliderAlt
						labelText="Line height"
						sliderName={SET_LINE_HEIGHT}
						initialValue={store.getState().text.lineHeight}
						step={0.1}
						maxValue={3}
						minValue={1}
					/>
					<div className={styles.selectorContainer}>
						<p className={styles.widthLabel}>
								Scroll width
						</p>
						<Selector items={scrollWidthSettngs} />
					</div>
					<SliderAlt
						labelText="Scroll speed"
						sliderName={SET_SCROLL_SPEED}
						initialValue={store.getState().text.scrollSpeed}
						maxValue={10}
						step={1}
					/>
					<div className="toggleWrapper">
						<p>
							Flip for reflection
						</p>
						<Toggle
							onChange={bool => handleFlip(bool)}
							checked={isFlipped}
							icons={null}
						/>
					</div>
				</div>
			</Col>
		</>
	)
}

export default EditorSidebar
