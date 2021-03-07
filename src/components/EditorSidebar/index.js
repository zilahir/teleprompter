import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col } from 'react-grid-system'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import Icon from 'react-icons-kit'
import { github } from 'react-icons-kit/fa/github'

import SliderAlt from '../common/SliderAlt'
import Selector from '../common/Selector'
import { scrollWidthSettngs, colorSchemeSettings, fontOptions, alignmentOptions, Colors } from '../../utils/consts'
import { SET_FONT_SIZE, SET_LINE_HEIGHT, SET_LETTER_SPACING, SET_SCROLL_SPEED } from '../../store/actions/actionTypes'
import styles from './EditorSidebar.module.scss'
import './Toggle.scss'
import { toggleMirror, setScrollWidth, setFont, setTextAlignment } from '../../store/actions/text'
import { setColorScheme } from '../../store/actions/misc'

/**
* @author zilahir
* @function EditorSidebar
* */

const EditorSidebar = () => {
	const dispatch = useDispatch()
	function handleFlip(boolean) {
		dispatch(toggleMirror(boolean.target.checked))
	}

	const fontSize = useSelector(state => state.text.fontSize)
	const letterSpacing = useSelector(state => state.text.letterSpacing)
	const lineHeight = useSelector(state => state.text.lineHeight)
	const scrollSpeed = useSelector(state => state.text.scrollSpeed)
	const flipped = useSelector(state => state.text.isFlipped)

	const scrollWidth = useSelector(state => state.text.scrollWidth)
	const activeScrollId = scrollWidthSettngs.find(curr => (
		curr.label === scrollWidth
	))

	const colorScheme = useSelector(state => state.misc.chosenColorScheme)
	const activeColorScheme = colorSchemeSettings.find(currColorScheme => (
		currColorScheme.label === colorScheme.toLowerCase()
	))

	const selectedFont = useSelector(state => state.text.chosenFont)
	const activeFont = fontOptions.find(currentFont => (
		currentFont.label === selectedFont.toLowerCase()
	))

	const selectedAlignment = useSelector(state => state.text.textAlignment)
	const activeAlignment = alignmentOptions.find(curentAlignment => (
		curentAlignment.id === selectedAlignment
	))

	function handleScrollWidthChange(chosenScrollWidthId) {
		const chosenValue = scrollWidthSettngs.find(item => (
			item.id === chosenScrollWidthId
		))

		dispatch(setScrollWidth(chosenValue.label))
	}

	function handleColorSchemeChange(chosenColorSchemeId) {
		const thisColorScheme = colorSchemeSettings.find(
			currentColorScheme => currentColorScheme.id === chosenColorSchemeId,
		)
		dispatch(setColorScheme(thisColorScheme.label))
	}

	function handleFontChange(chosenFontId) {
		const thisChosenFont = fontOptions.find(
			currentFont => currentFont.id === chosenFontId,
		)
		dispatch(setFont(thisChosenFont.label))
	}

	function handleAlignmentChange(chosenAlignmentId) {
		dispatch(setTextAlignment(chosenAlignmentId))
	}

	return (
		<>
			<Col
				lg={3}
				className={styles.editorSidebarContainer}
			>
				<div className={styles.innerContainer}>
					<SliderAlt
						labelText="Text size"
						sliderName={SET_FONT_SIZE}
						initialValue={fontSize}
						maxValue={10}
						step={1}
					/>
					<SliderAlt
						labelText="Letter spacing"
						sliderName={SET_LETTER_SPACING}
						initialValue={letterSpacing}
						minValue={0}
						maxValue={2}
						step={0.01}
					/>
					<SliderAlt
						labelText="Line height"
						sliderName={SET_LINE_HEIGHT}
						initialValue={lineHeight}
						step={0.1}
						maxValue={3}
						minValue={1}
					/>
					<div className={styles.selectorContainer}>
						<p className={styles.widthLabel}>
							Scroll width
						</p>
						<Selector
							items={scrollWidthSettngs}
							activeId={activeScrollId.id}
							onClick={id => handleScrollWidthChange(id)}
						/>
					</div>
					<SliderAlt
						labelText="Scroll speed"
						sliderName={SET_SCROLL_SPEED}
						initialValue={scrollSpeed}
						maxValue={10}
						step={1}
					/>
					<div className={styles.selectorContainer}>
						<p className={styles.widthLabel}>
							Color Scheme
						</p>
						<Selector
							items={colorSchemeSettings}
							activeId={activeColorScheme.id}
							onClick={id => handleColorSchemeChange(id)}
						/>
					</div>
					<div className={styles.selectorContainer}>
						<p className={styles.widthLabel}>
							Font
						</p>
						<Selector
							items={fontOptions}
							activeId={activeFont.id}
							onClick={id => handleFontChange(id)}
						/>
					</div>
					<div className={styles.selectorContainer}>
						<p className={styles.widthLabel}>
							Alignment
						</p>
						<Selector
							items={alignmentOptions}
							activeId={activeAlignment.id}
							onClick={id => handleAlignmentChange(id)}
						/>
					</div>
					<div className="toggleWrapper">
						<p>
							Flip for reflection
						</p>
						<Toggle
							onChange={bool => handleFlip(bool)}
							checked={flipped}
							icons={null}
						/>
					</div>
				</div>
				<div className={styles.footerContanier}>
					<p>
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="https://www.netlify.com"
						>
							Powered <span className={styles.purple}>by Netlify</span>
						</a>
					</p>
					<a className={styles.github} href="https://github.com/zilahir/teleprompter">
						<Icon icon={github} size="34px" color={Colors.purple} />
					</a>
				</div>
			</Col>
		</>
	)
}

export default EditorSidebar
