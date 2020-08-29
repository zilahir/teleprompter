import React from 'react'
import PropTypes from 'prop-types'
import { ic_pause as pauseIcon } from 'react-icons-kit/md/ic_pause'
import { times as deleteIcon } from 'react-icons-kit/fa/times'
import Icon from 'react-icons-kit'

import styles from './Break.module.scss'

/**
 * @author zilahir
 * @function Break
* */

const Break = ({
	id,
}) => {
	function handleDelete() {
		return id
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
					<Icon icon={deleteIcon} size="15px" />
				</button>
			</div>
		</div>
	)
}

Break.propTypes = {
	id: PropTypes.string.isRequired,
}

export default Break
