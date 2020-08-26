/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'
import random from 'random'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { times } from 'react-icons-kit/fa'

import styles from './Segment.module.scss'
import Input from '../common/Input'
import { colors } from '../../utils/consts'
import ColorPicker from '../ColorPicker'

const itemTypes = {
	CARD: 'card',
}

/**
 * @author zilahir
 * @function Segemnt
 * */

const OnseSegment = styled.div`
	border-color: ${props => props.borderColor};
`

const SegmentIndicator = styled.span`
	background-color: ${props => props.segmentColor};
`

const SegmentText = styled.textarea`
	height: ${props => props.height}px;
`

const Segment = ({
	segmentTitle,
	segmentText,
	moveSegment,
	index,
	id,
}) => {
	const ref = useRef(null)
	const segmentRef = useRef(null)
	const [scrollHeight, setScrollHeight] = useState()
	const [segmentColor, setSegmentColor] = useState(colors[random.int(0, colors.length - 1)])
	const [isColorPickerOpen, toggleColorPickerOpen] = useState(false)

	useEffect(() => {
		if (segmentRef.current) {
			setScrollHeight(segmentRef.current.scrollHeight)
		}
	}, [])

	const [, drop] = useDrop({
		accept: itemTypes.CARD,
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = index
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current.getBoundingClientRect()
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			// Determine mouse position
			const clientOffset = monitor.getClientOffset()
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}
			// Time to actually perform the action
			moveSegment(dragIndex, hoverIndex)
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex
		},
	})

	const [{ isDragging }, drag] = useDrag({
		item: { type: itemTypes.CARD, id, index },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const opacity = isDragging ? 0 : 1
	drag(drop(ref))

	return (
		<>
			<OnseSegment
				className={styles.oneSegment}
				borderColor={segmentColor}
				ref={ref}
				style={{ opacity }}
			>
				<div className={styles.segmentHeader}>
					<Input
						labelText={null}
						inputClassName={styles.segmentName}
						inheritedValue={segmentTitle}
					/>
					<ul>
						<li
							onClick={() => toggleColorPickerOpen(currStatus => !currStatus)}
						>
							<SegmentIndicator
								segmentColor={segmentColor}
								className={styles.segmentColorIndicator}
							/>
						</li>
						<li>
							<button type="button" className={styles.deleteBtn}>
								<Icon icon={times} />
							</button>
						</li>
					</ul>
				</div>
				<div className={styles.segmentBody}>
					<SegmentText
						ref={segmentRef}
						value={segmentText}
						height={scrollHeight}
					/>
				</div>
			</OnseSegment>
			<ColorPicker
				isVisible={isColorPickerOpen}
				onClose={() => toggleColorPickerOpen(false)}
				segmentIndex={index}
				onChangeColor={color => setSegmentColor(color)}
			/>
		</>
	)
}

Segment.propTypes = {
	id: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired,
	moveSegment: PropTypes.func.isRequired,
	segmentText: PropTypes.string.isRequired,
	segmentTitle: PropTypes.string.isRequired,
}

export default Segment
