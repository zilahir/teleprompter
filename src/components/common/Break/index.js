import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { ic_pause as pauseIcon } from 'react-icons-kit/md/ic_pause'
import CloseIcon from '@material-ui/icons/Close'
import Icon from 'react-icons-kit'

import styles from './Break.module.scss'
import { setSegments } from '../../../store/actions/segments'

/**
 * @author zilahir
 * @function Break
* */

const Break = ({
	id,
}) => {
	const dispatch = useDispatch()
	const allSegments = useSelector(state => state.segments.segments)
	function handleDelete() {
		const filteredSegments = allSegments.filter(segment => segment.id !== id)
		dispatch(setSegments(filteredSegments))
	}
	return (
		<div className={styles.oneBreak}>
			<div className={styles.middle}>
				<div className={styles.icon}>
					<Icon icon={pauseIcon} size="15px" />
				</div>
			</div>
			<div className={styles.deleteIconContainer}>
				<button
					type="button"
					className={styles.deleteBtn}
					onClick={() => handleDelete()}
				>
					<CloseIcon htmlColor="#ffffff" />
				</button>
			</div>
		</div>
	)
}

Break.propTypes = {
	id: PropTypes.string.isRequired,
}

export default Break
