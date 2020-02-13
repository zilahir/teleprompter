import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'react-redux'
import styled from 'styled-components'

import styles from './TextPreview.module.scss'

const Text = styled.p`
	font-size: ${props => props.fontSize}vw !important;
	line-height: ${props => props.lineHeight} !important;
	letter-spacing: ${props => props.letterSpacing}vw !important;
`

/**
* @author zilahir
* @function TextPreview
* */

const TextPreview = props => {
	const { text } = props
	const store = useStore()
	const [fontSize, setFontSize] = useState(null)
	const [lineHeight, setLineHeight] = useState(null)
	const [letterSpacing, setLetterSpacing] = useState(null)
	const [visibleText, setVisibleText] = useState([])
	useEffect(() => store.subscribe(() => {
		const fs = store.getState().text.fontSize
		const ln = store.getState().text.lineHeight
		const ls = store.getState().text.letterSpacing
		setFontSize(fs)
		setLineHeight(ln)
		setLetterSpacing(ls)
		setVisibleText(text.slice(0, 20))
	}), [store, fontSize, text])
	return (
		<div className={styles.textpreviewContainer}>
			<div className={styles.mirroredContainer}>
				<Text
					className={styles.mirrored}
					fontSize={`${fontSize}`}
					lineHeight={lineHeight}
					letterSpacing={letterSpacing}
				>
					{
						visibleText.map(currText => (
							`${currText} `
						))
					}
				</Text>
			</div>
			<div className={styles.textContainer}>
				<Text
					className={styles.text}
					fontSize={`${fontSize}`}
					lineHeight={lineHeight}
					letterSpacing={letterSpacing}
				>
					{
						visibleText.map(currText => (
							`${currText} `
						))
					}
				</Text>
			</div>
		</div>
	)
}

TextPreview.propTypes = {
	text: PropTypes.string.isRequired,
}

export default TextPreview
