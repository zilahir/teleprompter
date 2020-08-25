/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch, useStore, shallowEqual } from 'react-redux'
import styled from 'styled-components'

import { setText } from '../../store/actions/text'
import styles from './TextEditor.module.scss'
import { toggleUpdateBtn } from '../../store/actions/misc'
import Segment from '../Segment'

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
			{
				new Array(10).fill().map((_, index) => (
					<Segment
						key={`key-${index.toString()}`}
						segmentColor="#ff0000"
						segmentText="Velit irure incididunt occaecat consequat id pariatur enim cupidatat aliqua id nulla eiusmod. Esse adipisicing irure sunt id exercitation deserunt. Fugiat proident aliquip sunt labore est laboris ullamco consequat excepteur enim enim cupidatat. Reprehenderit incididunt qui nulla id aliqua. Mollit amet sunt adipisicing mollit irure dolor duis culpa exercitation laboris veniam."
						segmentTitle="Qui magna occaecat nostrud magna esse consequat deserunt"
					/>
				))
			}
		</div>
	)
}

export default TextEditor
