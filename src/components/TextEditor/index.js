/* eslint-disable no-return-assign */

import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useStore, shallowEqual } from 'react-redux'
import update from 'immutability-helper'

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

	const moveSegment = useCallback(
		(dragIndex, hoverIndex) => {
			const dragSegment = segments[dragIndex]
			setSegments(
				update(segments, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragSegment],
					],
				}),
			)
		},
		[segments],
	)

	const renderSegment = (segment, index) => (
		<Segment
			key={`key-${index.toString()}`}
			index={index}
			id={segment.id}
			segmentText={segment.segmentText}
			segmentTitle={segment.segmentTitle}
			moveSegment={moveSegment}
		/>
	)

	return (
		<div className={styles.textEditorContainer}>
			{
				segments.map((segment, index) => (
					renderSegment(segment, index)
				))
			}
		</div>
	)
}

export default TextEditor
