import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import shortid from 'shortid'
import { Col } from 'react-grid-system'
import random from 'random'
import PostAddIcon from '@material-ui/icons/PostAdd'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import classnames from 'classnames'

import { colors, SEGMENT, BREAK } from '../../utils/consts'
import TextEditor from '../TextEditor'
import styles from './Preview.module.scss'
import { addSegment } from '../../store/actions/segments'

/**
* @author zilahir
* @function Preview
* */

const Preview = () => {
	const [activeButton, setActiveButton] = useState(1)
	const dispatch = useDispatch()

	function handleNewSegment(type) {
		dispatch(addSegment({
			segmentTitle: '',
			segmentText: '',
			segmentColor: colors[random.int(0, colors.length - 1)],
			id: shortid.generate(),
			type: type.toLowerCase(),
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
									onClick={() => handleNewSegment(SEGMENT)}
									className={styles.button}
								>
									<div className={styles.addPrompterIcon}>
										<PostAddIcon htmlColor="#ffffff" />
									</div>
									<p>
										Add segment
									</p>
								</button>
								<button
									type="button"
									onClick={() => handleNewSegment(BREAK)}
									className={styles.button}
								>
									<div className={styles.addPrompterIcon}>
										<PlaylistAddIcon htmlColor="#ffffff" />
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
