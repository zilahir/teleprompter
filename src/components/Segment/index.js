/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { times } from 'react-icons-kit/fa'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Segment.module.scss'
import Input from '../common/Input'
import ColorPicker from '../ColorPicker'
import { modifySegment } from '../../store/actions/segments'

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
	segmentColor,
	segmentTitle,
	segmentKey,
	segmentId,
}) => {
	const thisSegmentRef = useRef(null)
	const [scrollHeight, setScrollHeight] = useState()
	const [isColorPickerOpen, toggleColorPickerOpen] = useState(false)
	const dispatch = useDispatch()

	const thisSegment = useSelector(
		state => state.segments.segments.find(segment => segment.id === segmentId),
	)

	useEffect(() => {
		if (thisSegmentRef.current) {
			setScrollHeight(thisSegmentRef.current.scrollHeight)
		}
	}, [])

	function handleSegmentNameChange(newSegmentTitle) {
		dispatch(modifySegment({
			...thisSegment,
			segmentTitle: newSegmentTitle,
		}))
	}

	function handleSegmentTextChange(newSegmentText) {
		dispatch(modifySegment({
			...thisSegment,
			segmentText: newSegmentText,
		}))
	}

	function handleSegmentColorChange(newColor) {
		dispatch(modifySegment({
			...thisSegment,
			segmentColor: newColor,
		}))
		toggleColorPickerOpen(false)
	}

	return (
		<>
			<OnseSegment
				className={styles.oneSegment}
				borderColor={segmentColor}
			>
				<div className={styles.segmentHeader}>
					<Input
						labelText={null}
						inputClassName={styles.segmentName}
						placeholder="Add segment name"
						onFocusOut={event => handleSegmentNameChange(event.target.value)}
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
						value={thisSegment.segmentText}
						onChange={event => handleSegmentTextChange(event.target.value)}
						height={scrollHeight}
						className={styles.segmentText}
					/>
				</div>
				<ColorPicker
					isVisible={isColorPickerOpen}
					onClose={() => toggleColorPickerOpen(false)}
					segmentIndex={segmentKey}
					segmentColor={segmentColor}
					onChangeColor={color => handleSegmentColorChange(color)}
				/>
			</OnseSegment>
		</>
	)
}

Segment.propTypes = {
	segmentColor: PropTypes.string.isRequired,
	segmentId: PropTypes.string.isRequired,
	segmentKey: PropTypes.number.isRequired,
	segmentTitle: PropTypes.string.isRequired,
}

export default Segment
