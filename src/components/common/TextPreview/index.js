/* eslint-disable consistent-return */
import React, { useEffect, useState, useRef, createRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import styles from './TextPreview.module.scss'
import { getFontFamily } from '../../../utils/getFontFamily'
import { alignmentOptions } from '../../../utils/consts'
import rootContext from '../../Main/rootContext'

const Text = styled.div`
	p {
		font-size: ${props => props.fontSize * 10}px;
		line-height: ${props => props.lineHeight} !important;
		letter-spacing: ${props => props.letterSpacing}vw !important;
		max-width: ${props => props.scrollWidth};
		font-family: ${props => props.fontFamily};
		text-align: ${props => props.textAlignment};
	}
`

const TextMirrored = styled.div`
	p {
		font-size: ${props => props.fontSize * 10}px;
		line-height: ${props => props.lineHeight} !important;
		letter-spacing: ${props => props.letterSpacing}vw !important;
		max-width: ${props => props.scrollWidth};
		transform: scaleY(-1);
		font-family: ${props => props.fontFamily};
		text-align: ${props => props.textAlignment};
	}
`

/**
* @author zilahir
* @function TextPreview
* */

const useInterval = (callback, delay) => {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		function tick() {
			savedCallback.current()
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => {
				clearInterval(id)
			}
		}
	}, [delay])
}

const TextPreview = props => {
	const { isAnimationRunning, scrollSpeed } = props
	const { textPreview } = useContext(rootContext)
	const [position, setPosition] = useState(0)
	const [scrollerRefs, setScrollerRefs] = useState([])
	const scrollSpeedValue = scrollSpeed * 10
	const { text } = useSelector(state => state)

	const { fontSize, lineHeight, letterSpacing, scrollWidth, fontFamily, textAlignment } = text

	const STEP = 5

	const chosenTextAlignment = alignmentOptions.find(
		alignment => alignment.id === textAlignment,
	).option.toLowerCase()

	useInterval(() => {
		setPosition(position + STEP)
		scrollerRefs.forEach(currRef => currRef.current.scroll({
			top: position,
		}))
	}, isAnimationRunning ? scrollSpeedValue : null)

	const scrollHandler = event => {
		setPosition(event.currentTarget.scrollTop)
	}

	useEffect(() => {
		scrollerRefs.forEach(currRef => currRef.current.scroll({ top: position }))
	}, [position])

	useEffect(() => {
		scrollerRefs.forEach(currRef => currRef.current.addEventListener('scroll', scrollHandler))
		setScrollerRefs(ref => (
			Array(2).fill().map((_, index) => ref[index] || createRef())
		))
		return () => scrollerRefs.forEach(currRef => currRef.current.removeEventListener('scroll', scrollHandler))
	}, [])

	return (
		<div className={styles.textpreviewContainer}>
			<div
				className={styles.mirroredContainer}
				ref={scrollerRefs[0]}
			>
				<TextMirrored
					className={styles.mirrored}
					fontSize={`${fontSize}`}
					lineHeight={lineHeight}
					letterSpacing={letterSpacing}
					scrollWidth={scrollWidth}
					fontFamily={getFontFamily(fontFamily)}
					textAlignment={chosenTextAlignment}
				>
					<div
						className={styles.innerContainer}
					>
						<p>
							{textPreview}
						</p>
					</div>
				</TextMirrored>
			</div>
			<div
				className={styles.textContainer}
				ref={scrollerRefs[1]}
			>
				<Text
					className={styles.text}
					fontSize={`${fontSize}`}
					lineHeight={lineHeight}
					letterSpacing={letterSpacing}
					scrollWidth={scrollWidth}
					fontFamily={getFontFamily(fontFamily)}
					textAlignment={chosenTextAlignment}
				>
					<div
						className={styles.innerContainer}
					>
						<p>
							{textPreview}
						</p>
					</div>
				</Text>
			</div>
		</div>
	)
}

TextPreview.propTypes = {
	isAnimationRunning: PropTypes.bool.isRequired,
	scrollSpeed: PropTypes.number.isRequired,
}

export default TextPreview
