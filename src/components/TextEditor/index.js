/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useStore, useDispatch } from 'react-redux'

import segmentsApi from '../../utils/fakeApi/segments'
import Segment from '../Segment'
import { setSegments } from '../../store/actions/segments'
import { SEGMENT } from '../../utils/consts'
import Break from '../common/Break'

const TextEditor = () => {
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	const [segments, setAllSegments] = useState(segmentsApi.getAllSegments())
	const store = useStore()
	const dispatch = useDispatch()

	function onDragEnd(result) {
		if (!result.destination) {
			return
		}

		const newItems = reorder(
			segments,
			result.source.index,
			result.destination.index,
		)

		setAllSegments(newItems)
		dispatch(setSegments(newItems))
	}

	const grid = 8

	const getItemStyle = (isDragging, draggableStyle) => ({
		userSelect: 'none',
		padding: `${grid}px 0`,
		margin: `0 0 ${grid}px 0`,
		background: isDragging ? 'transport' : 'transport',
		...draggableStyle,
	})

	useEffect(() => store.subscribe(() => {
		const currentSegmentList = store.getState().segments.segments
		setAllSegments(currentSegmentList)
	}), [store])

	return (
		<DragDropContext onDragEnd={result => onDragEnd(result)}>
			<Droppable droppableId="droppable">
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{segments.map((currSegment, index) => (
							<Draggable key={currSegment.id} draggableId={`segment-${currSegment.id.toString()}`} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={getItemStyle(
											snapshot.isDragging,
											provided.draggableProps.style,
										)}
									>
										{
											currSegment.type === SEGMENT.toLowerCase() ? (
												<Segment
													key={`key-${index.toString()}`}
													segmentTitle={currSegment.segmentTitle}
													index={index}
													segmentColor={currSegment.segmentColor}
													segmentId={currSegment.id}
												/>
											) : <Break id={currSegment.id} />
										}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default TextEditor
