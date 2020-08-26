/* eslint-disable no-return-assign */

import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useStore, shallowEqual } from 'react-redux'
import move from 'array-move'

import { findIndex } from '../../utils/findIndex'
import { setText } from '../../store/actions/text'
import styles from './TextEditor.module.scss'
import { toggleUpdateBtn } from '../../store/actions/misc'
import Segment from '../Segment'
import segmentsApi from '../../utils/fakeApi/segments'

/**
* @author zilahir
* @function TextEditor
* */

const TextEditor = () => {
	const [text, setVal] = useState()
	const demoSegments = segmentsApi.getAllSegments()
	const [segments, setSegments] = useState(demoSegments)
	const positions = useRef([]).current
	const setPosition = (i, offset) => {
		positions[i] = offset
	}

	const dispatch = useDispatch()
	const store = useStore()

	// eslint-disable-next-line no-unused-vars
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

	const moveItem = (i, dragOffset) => {
		const targetIndex = findIndex(i, dragOffset, positions)
		if (targetIndex !== i) setSegments(move(segments, i, targetIndex))
	}

	return (
		<div className={styles.textEditorContainer}>
			{
				segments.map((currSegment, index) => (
					<Segment
						key={`key-${index.toString()}`}
						segmentText={currSegment.segmentText}
						segmentTitle={currSegment.segmentTitle}
						moveItem={moveItem}
						setPosition={setPosition}
						index={index}
					/>
				))
			}
		</div>
	)
}

export default TextEditor
