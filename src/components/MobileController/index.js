/* eslint-disable no-alert */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import playPause from '../../assets/controls/play.svg'
import backward from '../../assets/controls/backward.svg'
import forward from '../../assets/controls/forward.svg'
import styles from './MobileContainer.module.scss'

/**
 * @author zilahir
 * @function MobileController
 * */

const MobileController = ({ prompterId }) => {
	function handleStartStop() {
		alert('hello')
	}
	return (
		<div className={styles.mainContainer}>
			<div className={styles.middle}>
				<div className={classnames(
					styles.oneButton,
					styles.dirButton,
				)}
				>
					<img src={backward} alt="backwards" />
				</div>
				<div
					className={classnames(
						styles.oneButton,
						styles.playPause,
					)}
					role="button"
					onClick={() => handleStartStop()}
					onKeyDown={null}
					tabIndex={-1}
				>
					<img alt="play" src={playPause} />
				</div>
				<div className={classnames(
					styles.oneButton,
					styles.dirButton,
				)}
				>
					<img src={forward} alt="backwards" />
				</div>
			</div>
		</div>
	)
}

MobileController.propTypes = {
	prompterId: PropTypes.string.isRequired,
}

export default MobileController
