/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Col } from 'react-grid-system'
import Icon from 'react-icons-kit'
import { ic_library_add as addSegmentIcon } from 'react-icons-kit/md/ic_library_add'
import { ic_playlist_add as addPauseIcon } from 'react-icons-kit/md/ic_playlist_add'
import classnames from 'classnames'

import { HELPER_TOP, INFOBOX_TOP } from '../../utils/consts'
import TextEditor from '../TextEditor'
import styles from './Preview.module.scss'
import Instruction from '../common/Instruction'

/**
* @author zilahir
* @function Preview
* */

const Preview = () => {
	const [activeButton, setActiveButton] = useState(1)
	const isGuideVisible = useSelector(state => state.misc.instructions[INFOBOX_TOP])
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
									onClick={() => null}
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
