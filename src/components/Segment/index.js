import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from 'react-icons-kit'
import { times } from 'react-icons-kit/fa/times'

import PrompterIcon from '../common/Icon'
import { Colors } from '../../utils/consts'
import styles from './Segment.module.scss'

/**
* @author zilahir
* @function Segment
* */

const SegmentContainer = styled.div`
	border-color: ${props => props.segmentColor};
`

const Segment = props => {
	const { segmentText, segmentName, segmentColor } = props
	return (
		<SegmentContainer
			className={styles.segmentContainer}
			segmentColor={segmentColor}
		>
			<div className={styles.segmentHeader}>
				<h1>
					{segmentName}
				</h1>
				<div className={styles.deleteIconContainer}>
					<PrompterIcon
						color={Colors.gray4}
						onClick={() => alert("clicked")}
						icon={
							<Icon icon={times} size="1em" />
						}
					/>
				</div>
			</div>
			<p>
				{segmentText}
			</p>
		</SegmentContainer>
	)
}

Segment.propTypes = {
	segmentColor: PropTypes.string.isRequired,
	segmentName: PropTypes.string.isRequired,
	segmentText: PropTypes.string.isRequired,
}

export default Segment
