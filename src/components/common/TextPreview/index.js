import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'
import { useStore } from 'react-redux'
import styled from 'styled-components'

import styles from './TextPreview.module.scss'

const Text = styled.div`
	p {
		transform: scale(${props => props.fontSize});
		line-height: ${props => props.lineHeight} !important;
		letter-spacing: ${props => props.letterSpacing}vw !important;
		max-width: ${props => props.scrollWidth};
	}
`

const TextMirrored = styled.div`
	p {
		transform: scale(${props => props.fontSize}, -${props => props.fontSize});
		line-height: ${props => props.lineHeight} !important;
		letter-spacing: ${props => props.letterSpacing}vw !important;
		max-width: ${props => props.scrollWidth};
	}
`

/**
* @author zilahir
* @function TextPreview
* */

const TextPreview = props => {
	const { text, isAnimationRunning } = props
	const store = useStore()
	const [fontSize, setFontSize] = useState(null)
	const [lineHeight, setLineHeight] = useState(null)
	const [letterSpacing, setLetterSpacing] = useState(null)
	const [scrollWidth, setScrollWidth] = useState(null)
	const controls = useAnimation()
	const container = {
		start: {
			y: 0,
		},
		end: {
			y: -500,
		},
	}
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

	useEffect(() => {
		if (isAnimationRunning) {
			controls.start('end')
		} else {
			controls.stop()
		}
	}, [isAnimationRunning])
	return (
		<div className={styles.textpreviewContainer}>
			<div className={styles.mirroredContainer}>
				<TextMirrored
					className={styles.mirrored}
					fontSize={`${fontSize}`}
					lineHeight={lineHeight}
					letterSpacing={letterSpacing}
					scrollWidth={scrollWidth}
				>
					<motion.div
						animate={controls}
						variants={container}
						transition={{ ease: 'linear', duration: 10 }}
						className={styles.innerContainer}
					>
						<p>
							{text}
						</p>
					</motion.div>
				</TextMirrored>
			</div>
			<div className={styles.textContainer}>
				<Text
					className={styles.text}
					fontSize={`${fontSize}`}
					lineHeight={lineHeight}
					letterSpacing={letterSpacing}
					scrollWidth={scrollWidth}
				>
					<motion.div
						className={styles.innerContainer}
						animate={controls}
						variants={container}
						transition={{ ease: 'linear', duration: 10 }}
					>
						<p>
							{text}
						</p>
					</motion.div>
				</Text>
			</div>
		</div>
	)
}

TextPreview.propTypes = {
	isAnimationRunning: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
}

export default TextPreview
