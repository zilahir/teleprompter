import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
	const dispatch = useDispatch()

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
			/>
		</div>
	)
}

export default TextEditor
