import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'react-redux'
import styled from 'styled-components'

import styles from './TextPreview.module.scss'

const Text = styled.p`
	font-size: ${props => props.fontSize} !important;
	line-height: ${props => props.lineHeight} !important;
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
	useEffect(() => store.subscribe(() => {
		const fs = store.getState().text.fontSize
		const ln = store.getState().text.lineHeight
		setFontSize(fs)
		setLineHeight(ln)
	}), [store, fontSize])
	return (
		<div className={styles.textpreviewContainer}>
			<div className={styles.mirroredContainer}>
				<Text
					className={styles.mirrored}
					fontSize={`${fontSize}px`}
					lineHeight={lineHeight}
				>
					{text}
				</Text>
			</div>
			<div className={styles.textContainer}>
				<Text className={styles.text}>
					{text}
				</Text>
			</div>
		</div>
	)
}

TextPreview.propTypes = {
	text: PropTypes.string.isRequired,
}

export default TextPreview
