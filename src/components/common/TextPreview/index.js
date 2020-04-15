/* eslint-disable consistent-return */
import React, { useEffect, useState, useRef, createRef } from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'react-redux'
import styled from 'styled-components'

import styles from './TextPreview.module.scss'

const Text = styled.div`
	p {
		font-size: ${props => props.fontSize * 10}px;
		line-height: ${props => props.lineHeight} !important;
		letter-spacing: ${props => props.letterSpacing}vw !important;
		max-width: ${props => props.scrollWidth};
	}
`

const TextMirrored = styled.div`
	p {
		font-size: ${props => props.fontSize * 10}px;
		line-height: ${props => props.lineHeight} !important;
		letter-spacing: ${props => props.letterSpacing}vw !important;
		max-width: ${props => props.scrollWidth};
		transform: scaleY(-1);
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
	const { text, isAnimationRunning, scrollSpeed } = props
	const store = useStore()
	const [fontSize, setFontSize] = useState(null)
	const [lineHeight, setLineHeight] = useState(null)
	const [letterSpacing, setLetterSpacing] = useState(null)
	const [scrollWidth, setScrollWidth] = useState(null)
	const [position, setPosition] = useState(0)
	const [scrollerRefs, setScrollerRefs] = useState([])
	const scrollSpeedValue = scrollSpeed * 10

	const STEP = 5
	// const scrollerRef = useRef(null)

	useEffect(() => store.subscribe(() => {
		const fs = store.getState().text.fontSize
		const ln = store.getState().text.lineHeight
		const ls = store.getState().text.letterSpacing
		const sw = store.getState().text.scrollWidth
		setFontSize(fs)
		setLineHeight(ln)
		setLetterSpacing(ls)
		setScrollWidth(sw)
	}), [store, fontSize, text, scrollWidth])

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
				>
					<div
						className={styles.innerContainer}
					>
						<p>
							{text}
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
				>
					<div
						className={styles.innerContainer}
					>
						<p>
							{text}
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
	text: PropTypes.string.isRequired,
}

export default TextPreview
