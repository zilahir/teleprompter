/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useStore } from 'react-redux'

import segmentsApi from '../../utils/fakeApi/segments'
import Segment from '../Segment'

const TextEditor = () => {
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	const [segments, setSegments] = useState(segmentsApi.getAllSegments())
	const store = useStore()

	function onDragEnd(result) {
		if (!result.destination) {
			return
		}

		const newItems = reorder(
			segments,
			result.source.index,
			result.destination.index,
		)

		setSegments(newItems)
	}

	const grid = 8

	const getItemStyle = (isDragging, draggableStyle) => ({
		// some basic styles to make the items look a bit nicer
		userSelect: 'none',
		padding: grid * 2,
		margin: `0 0 ${grid}px 0`,

		// change background colour if dragging333
		background: isDragging ? 'transport' : 'transport',

		// styles we need to apply on draggables
		...draggableStyle,
	})

	useEffect(() => store.subscribe(() => {
		const currentSegmentList = store.getState().segments.segments
		setSegments(currentSegmentList)
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
										<Segment
											key={`key-${index.toString()}`}
											segmentText={currSegment.segmentText}
											segmentTitle={currSegment.segmentTitle}
											index={index}
											segmentColor={currSegment.segmentColor}
										/>
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
