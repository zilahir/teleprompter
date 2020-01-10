import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'
import Icon from 'react-icons-kit'
import { plus } from 'react-icons-kit/feather/plus'

import { segmentColors, Colors } from '../../utils/consts'
import PropterIcon from '../common/Icon'
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
					<div className={styles.innerContainer}>
						<div className={styles.segmentsHeader}>
							<button
								type="button"
								onClick={() => alert("hello")}
								onKeyDown={null}
								className={styles.button}
							>
								<div className={styles.addIconContainer}>
									<PropterIcon
										color={Colors.gray4}
										icon={
											<Icon siz="1em" icon={plus} />
										}
									/>
								</div>
								<p>
									Add segment
								</p>
							</button>
						</div>
						{
							segments.map((segment, index) => (
								<Segments
									segmentName={segment.segmentName}
									segmentText={segment.segmentText}
									segmentColor={segmentColors[index % segmentColors.length]}
									segmentId={segment.id}
								/>
							))
						}
					</div>
				</div>
			</Col>
		</>
	)
}

export default Preview
