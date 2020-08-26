/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import segmentsApi from '../../utils/fakeApi/segments'
import Segment from '../Segment'

const TextEditor = () => {
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list)
		const [removed] = result.splice(startIndex, 1)
		result.splice(endIndex, 0, removed)

		return result
	}

	const getItemStyle = (isDragging, draggableStyle) => ({
		userSelect: 'none',
		...draggableStyle,
	})

	const [items, setItems] = useState(segmentsApi.getAllSegments())

	function onDragEnd(result) {
		if (!result.destination) {
			return
		}

		const newItems = reorder(
			items,
			result.source.index,
			result.destination.index,
		)

		setItems(newItems)
	}

	return (
		<DragDropContext onDragEnd={result => onDragEnd(result)}>
			<Droppable droppableId="droppable">
				{provided => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{items.map((currSegment, index) => (
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
