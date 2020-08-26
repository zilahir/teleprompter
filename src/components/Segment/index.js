/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import random from 'random'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { times } from 'react-icons-kit/fa'
import { useMotionValue, motion } from 'framer-motion'

import styles from './Segment.module.scss'
import Input from '../common/Input'
import { colors } from '../../utils/consts'
import ColorPicker from '../ColorPicker'

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
`

const Segment = ({
	segmentTitle,
	segmentText,
	segmentKey,
	moveItem,
	index,
	setPosition,
}) => {
	const thisSegmentRef = useRef(null)
	const [scrollHeight, setScrollHeight] = useState()
	const [segmentColor, setSegmentColor] = useState(colors[random.int(0, colors.length - 1)])
	const [isColorPickerOpen, toggleColorPickerOpen] = useState(false)

	useEffect(() => {
		if (thisSegmentRef.current) {
			setScrollHeight(thisSegmentRef.current.scrollHeight)
		}
	}, [])
	const [isDragging, setDragging] = useState(false)
	const dragOriginY = useMotionValue(0)

	const onTop = { zIndex: 1 }
	const flat = {
		zIndex: 0,
		transition: { delay: 0.3 },
	}

	useEffect(() => {
		setPosition(index, {
			height: thisSegmentRef.current.offsetHeight,
			top: thisSegmentRef.current.offsetTop,
		})
	})

	return (
		<motion.div
			ref={thisSegmentRef}
			initial={false}
			dragOriginY={dragOriginY}
			animate={isDragging ? onTop : flat}
			whileHover={{ scale: 1.03 }}
			whileTap={{ scale: 1.12 }}
			drag="y"
			dragConstraints={{ top: 0, bottom: 0 }}
			dragElastic={1}
			onDragStart={() => setDragging(true)}
			onDragEnd={() => setDragging(false)}
			onDrag={(e, { point }) => moveItem(index, point.y)}
			positionTransition={({ delta }) => {
				if (isDragging) {
					dragOriginY.set(dragOriginY.get() + delta.y)
				}
				return !isDragging
			}}
		>
			<OnseSegment
				className={styles.oneSegment}
				borderColor={segmentColor}
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
						ref={thisSegmentRef}
						value={segmentText}
						height={scrollHeight}
					/>
				</div>
			</OnseSegment>
			<ColorPicker
				isVisible={isColorPickerOpen}
				onClose={() => toggleColorPickerOpen(false)}
				segmentIndex={segmentKey}
				onChangeColor={color => setSegmentColor(color)}
			/>
		</motion.div>
	)
}

Segment.propTypes = {
	index: PropTypes.number.isRequired,
	moveItem: PropTypes.func.isRequired,
	segmentKey: PropTypes.number.isRequired,
	segmentText: PropTypes.string.isRequired,
	segmentTitle: PropTypes.string.isRequired,
	setPosition: PropTypes.func.isRequired,
}

export default Segment
