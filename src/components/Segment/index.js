import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import styles from './Segment.module.scss'

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
	segmentTitle,
	segmentColor,
	segmentText,
}) => (
	<OnseSegment
		className={styles.oneSegment}
		borderColor={segmentColor}
	>
		<div className={styles.segmentHeader}>
			<div className={styles.segmentHeaderInner}>
				<p>
					{segmentTitle}
				</p>
				<ul>
					<li>
						<SegmentIndicator segmentColor={segmentColor} />
					</li>
				</ul>
			</div>
			<div className={styles.segmentBody}>
				<p>
					{segmentText}
				</p>
			</div>
		</div>
	</OnseSegment>
)


Segment.propTypes = {
	segmentColor: PropTypes.string.isRequired,
	segmentText: PropTypes.string.isRequired,
	segmentTitle: PropTypes.string.isRequired,
}

export default Segment
