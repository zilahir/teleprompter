/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'
import Icon from 'react-icons-kit'
import { plus } from 'react-icons-kit/feather/plus'
import classnames from 'classnames'

import { segmentColors, Colors } from '../../utils/consts'
import TextEditor from '../TextEditor'
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
	const [activeButton, setActiveButton] = useState(1)
	useEffect(() => store.subscribe(() => {
		const allSegments = store.getState().segments.segments
		setSegments(allSegments)
	}), [store])
	return (
		<>
			<Col lg={6}>
				<div className={styles.previewContainer}>
					<div className={styles.tabContainer}>
						<button
							className={classnames(
								styles.tabButton,
								activeButton === 1 ? styles.tabButtonActive : null,
							)}
							type="button"
							onClick={() => setActiveButton(1)}
						>
							Text
						</button>
						<button
							className={classnames(
								styles.tabButton,
								activeButton === 2 ? styles.tabButtonActive : null,
							)}
							type="button"
							onClick={() => setActiveButton(2)}
						>
							Segments
						</button>
					</div>
					{
						activeButton === 2
							? (
								<div className={styles.innerContainer}>
									<div className={styles.segmentsHeader}>
										<button
											type="button"
											onClick={() => alert("hello")}
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
										<button
											type="button"
											className={styles.button}
											onClick={() => alert("hello")}
										>
											Clear all
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
							)
							: activeButton === 1
								? (
									<TextEditor />
								)
								: null
					}
				</div>
			</Col>
		</>
	)
}

export default Preview
