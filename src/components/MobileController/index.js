/* eslint-disable no-alert */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import playPause from '../../assets/controls/play.svg'
import backward from '../../assets/controls/backward.svg'
import forward from '../../assets/controls/forward.svg'
import styles from './MobileContainer.module.scss'
import down from '../../assets/controls/angle-up.svg'
import up from '../../assets/controls//angle-up-1.svg'

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
			<div
				className={styles.top}
				role="button"
				onKeyDown={null}
				tabIndex={-1}
				onClick={() => alert("hello")}
			>
				<img src={up} alt="up" />
			</div>
			<div className={styles.middle}>
				<div
					className={classnames(
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
				<div
					className={classnames(
						styles.oneButton,
						styles.dirButton,
					)}
					role="button"
					onKeyDown={null}
					tabIndex={-1}
					onClick={() => alert("hello")}
				>
					<img src={forward} alt="backwards" />
				</div>
			</div>
			<div className={styles.bottom}>
				<img src={down} alt="down" />
			</div>
		</div>
	)
}

MobileController.propTypes = {
	prompterId: PropTypes.string.isRequired,
}

export default MobileController
