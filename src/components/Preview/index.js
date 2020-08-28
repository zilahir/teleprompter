/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import shortid from 'shortid'
import { Col } from 'react-grid-system'
import random from 'random'
import Icon from 'react-icons-kit'
import { ic_library_add as addSegmentIcon } from 'react-icons-kit/md/ic_library_add'
import { ic_playlist_add as addPauseIcon } from 'react-icons-kit/md/ic_playlist_add'
import classnames from 'classnames'

import { HELPER_TOP, INFOBOX_TOP, colors } from '../../utils/consts'
import TextEditor from '../TextEditor'
import styles from './Preview.module.scss'
import Instruction from '../common/Instruction'
import { addSegment } from '../../store/actions/segments'

/**
* @author zilahir
* @function Preview
* */

const Preview = () => {
	const [activeButton, setActiveButton] = useState(1)
	const isGuideVisible = useSelector(state => state.misc.instructions[INFOBOX_TOP])
	const dispatch = useDispatch()

	function handleNewSegment() {
		dispatch(addSegment({
			segmentTitle: 'Add segment name',
			segmentText: '',
			segmentColor: colors[random.int(0, colors.length - 1)],
			id: shortid.generate(),
		}))
	}
	return (
		<>
			<Col
				lg={6}
				className={styles.previewRoot}
			>
				<div className={styles.innerContainer}>
					<div className={styles.previewContainer}>
						{
							isGuideVisible
								? (
									<Instruction
										text={HELPER_TOP}
										type={INFOBOX_TOP}
									/>
								)
								: null
						}
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
						<div className={styles.innerContainer}>
							<div className={styles.segmentsHeader}>
								<button
									type="button"
									onClick={() => handleNewSegment()}
									className={styles.button}
								>
									<div className={styles.addPrompterIcon}>
										<Icon
											icon={addSegmentIcon}
										/>
									</div>
									<p>
										Add segment
									</p>
								</button>
								<button
									type="button"
									onClick={() => null}
									className={styles.button}
								>
									<div className={styles.addPrompterIcon}>
										<Icon
											icon={addPauseIcon}
										/>
									</div>
									<p>
										Add pause
									</p>
								</button>
							</div>
							<TextEditor />
						</div>
					</div>
				</div>
			</Col>
		</>
	)
}

export default Preview
