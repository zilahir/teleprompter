import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import styles from './Segment.module.scss'
import segmentApi from '../../utils/fakeApi/segments'

/**
* @author zilahir
* @function Segment
* */

const SegmentContainer = styled.div`
	border-color: ${props => props.segmentColor};
`

const Segment = props => {
	const { segmentText, segmentName, segmentColor } = props
	console.debug('segmentColor', segmentColor)
	return (
		<SegmentContainer
			className={styles.segmentContainer}
			segmentColor={segmentColor}
		>
			<h1>
				{segmentName}
			</h1>
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
