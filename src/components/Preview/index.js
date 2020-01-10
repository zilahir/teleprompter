import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import { segmentColors } from '../../utils/consts'
import Segments from '../Segment'
import styles from './Preview.module.scss'

/**
* @author zilahir
* @function Preview
* */

const Preview = () => {
	const store = useStore()
	const [segments, setSegments] = useState([])

	useEffect(() => store.subscribe(() => {
		const allSegments = store.getState().segments.segments
		setSegments(allSegments)
	}), [store])
	return (
		<>
			<Col lg={6}>
				<div className={styles.previewContainer}>
					{
						segments.map((segment, index) => (
							<Segments
								segmentName={segment.segmentName}
								segmentText={segment.segmentText}
								segmentColor={segmentColors[index % segmentColors.length]}
							/>
						))
					}
				</div>
			</Col>
		</>
	)
}

export default Preview
