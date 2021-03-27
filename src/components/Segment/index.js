/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import TextareaAutosize from 'react-autosize-textarea'

import rootContext from '../Main/rootContext'
import styles from './Segment.module.scss'
import Input from '../common/Input'
import ColorPicker from '../ColorPicker'
import { modifySegment, setSegments } from '../../store/actions/segments'

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

const Segment = ({
	segmentColor,
	segmentTitle,
	segmentKey,
	segmentId,
}) => {
	const thisSegmentRef = useRef(null)
	const [isColorPickerOpen, toggleColorPickerOpen] = useState(false)
	const dispatch = useDispatch()
	const context = useContext(rootContext)

	const thisSegment = useSelector(
		state => state.segments.segments.find(segment => segment.id === segmentId),
	)

	const allSegments = useSelector(state => state.segments.segments)

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

	function segmentTextOnBlur(event) {
		context.setTextPreview(event.target.value)
	}

	function handleSegmentColorChange(newColor) {
		dispatch(modifySegment({
			...thisSegment,
			segmentColor: newColor,
		}))
		toggleColorPickerOpen(false)
	}

	function handleSegmentDelete() {
		const filteredSegments = allSegments.filter(segment => segment.id !== segmentId)
		dispatch(setSegments(filteredSegments))
	}

	function handleFocusOut(event) {
		handleSegmentNameChange(event.target.value)
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
						onFocusOut={event => handleFocusOut(event)}
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
							<button
								type="button"
								className={styles.deleteBtn}
								onClick={() => handleSegmentDelete()}
							>
								<CloseIcon htmlColor="#ffffff" />
							</button>
						</li>
					</ul>
				</div>
				<div className={styles.segmentBody}>
					<TextareaAutosize
						onChange={event => handleSegmentTextChange(event.target.value)}
						className={styles.segmentText}
						value={thisSegment.segmentText}
						ref={thisSegmentRef}
						onBlur={event => segmentTextOnBlur(event)}
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
