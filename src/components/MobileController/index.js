/* eslint-disable no-alert */
import React from 'react'
import PropTypes from 'prop-types'
import useSocket from 'use-socket.io-client'
import classnames from 'classnames'
import styled from 'styled-components'

import playPause from '../../assets/controls/play.svg'
import backward from '../../assets/controls/backward.svg'
import forward from '../../assets/controls/forward.svg'
import styles from './MobileContainer.module.scss'
import down from '../../assets/controls/angle-up.svg'
import up from '../../assets/controls/angle-up-1.svg'
import arrowBg from '../../assets/controls/bg.svg'

/**
 * @author zilahir
 * @function MobileController
 * */

const BTN = styled.div`
	&:before {
		content: '';
		background-image: url(${arrowBg})
	}
`

const MobileController = ({ prompterId }) => {
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NODE_ENV === 'production')
	function handleStartStop() {
		socket.emit('isPlaying', {
			prompterId: '',
			isPlaying: true,
		})
	}
	return (
		<div className={styles.mainContainer}>
			<BTN
				className={styles.top}
				role="button"
				onKeyDown={null}
				tabIndex={-1}
				onClick={() => alert("hello")}
			>
				<img src={up} alt="up" />
			</BTN>
			<div className={styles.middle}>
				<BTN
					className={classnames(
						styles.oneButton,
						styles.dirButton,
					)}
				>
					<img src={backward} alt="backwards" />
				</BTN>
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
				<BTN
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
				</BTN>
			</div>
			<BTN className={styles.bottom}>
				<img src={down} alt="down" />
			</BTN>
		</div>
	)
}

MobileController.propTypes = {
	prompterId: PropTypes.string.isRequired,
}

export default MobileController
