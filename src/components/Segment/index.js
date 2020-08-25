/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import random from 'random'
import styled from 'styled-components'
import { CirclePicker } from 'react-color'
import Icon from 'react-icons-kit'
import { times } from 'react-icons-kit/fa'

import styles from './Segment.module.scss'
import Input from '../common/Input'
import { colors } from '../../utils/consts'

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
			<div className={classnames(
				styles.colorPickerContainer,
				isColorPickerOpen ? styles.visible : styles.hidden,
			)}
			>
				<CirclePicker
					onChange={color => setSegmentColor(color.hex)}
				/>
			</div>
		</>
	)
}

Segment.propTypes = {
	segmentText: PropTypes.string.isRequired,
	segmentTitle: PropTypes.string.isRequired,
}

export default Segment
