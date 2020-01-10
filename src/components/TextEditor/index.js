import React, { useState, useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { setText } from '../../store/actions/text'
import styles from './TextEditor.module.scss'

/**
* @author
* @function TextEditor
* */

const TextArea = styled.textarea`
	font-size: ${props => props.fontSize};
`

const TextEditor = () => {
	const [text, setVal] = useState()
	const [fontSize, setFontSize] = useState(18)
	const store = useStore()
	const dispatch = useDispatch()
	useEffect(() => store.subscribe(() => {
		const size = store.getState().text.fontSize
		setFontSize(size)
	}), [store])

	function handleTextChange(e) {
		setVal(e.target.value)
		dispatch(setText(e.target.value))
	}
	return (
		<div className={styles.textEditorContainer}>
			<TextArea
				className={styles.textArea}
				onChange={e => handleTextChange(e)}
				value={text}
				fontSize={`${fontSize}px`}
			/>
		</div>
	)
}

export default TextEditor
