import React, { useState, useEffect } from 'react'
import { useDispatch, useStore, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { setText } from '../../store/actions/text'
import styles from './TextEditor.module.scss'
import { toggleUpdateBtn } from '../../store/actions/misc'

/**
* @author zilahir
* @function TextEditor
* */

const TextArea = styled.textarea`
	font-size: 16px;
`

const TextEditor = () => {
	const [text, setVal] = useState()
	const dispatch = useDispatch()
	const store = useStore()
	function handleTextChange(e) {
		dispatch(setText(e.target.value))
		if (store.getState().userPrompters.prompterObject) {
			const result = shallowEqual(
				e.target.value, store.getState().userPrompters.prompterObject.text,
			)
			if (!result) {
				dispatch(toggleUpdateBtn(true))
			}
		}
	}
	useEffect(() => store.subscribe(() => {
		const currText = store.getState().text.text
		setVal(currText)
	}), [text])
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
