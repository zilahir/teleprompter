import React, { useState, useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import styled from 'styled-components'

import styles from './TextEditor.module.scss'

/**
* @author
* @function TextEditor
* */

const TextArea = styled.textarea`
	font-size: ${props => props.fontSize}px;
`

const TextEditor = () => {
	const [text, setText] = useState()
	const store = useStore()

	useEffect(() => {
		console.debug('render')
	}, [store])

	function handleTextChange(e) {
		setText(e.target.value)
	}
	return (
		<div className={styles.textEditorContainer}>
			<TextArea
				className={styles.textArea}
				onChange={e => handleTextChange(e)}
				value={text}
				fontSize={store.getState().text.fontSize}
			/>
		</div>
	)
}

export default TextEditor
