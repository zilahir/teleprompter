/* eslint-disable no-alert */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useSocket from 'use-socket.io-client'
import classnames from 'classnames'
import styled from 'styled-components'
import { MorphReplace } from 'react-svg-morph'

import play from '../../assets/controls/play.svg'
import pause from '../../assets/controls/pause.svg'
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

const MobileController = () => {
	const { slug } = useParams()
	const [isPlaying, togglePlaying] = useState(false)
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NODE_ENV === 'production')
	function handleStartStop() {
		console.debug('clicked', isPlaying)
		togglePlaying(!isPlaying)
		/* socket.emit('isPlaying', {
			prompterId: slug,
			isPlaying: true,
		}) */
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
					<MorphReplace>
						{
							!isPlaying
								? (
									<svg xmlns="http://www.w3.org/2000/svg" width="27.459" height="31.384" viewBox="0 0 27.459 31.384"><path fill="#ffffff" d="M26.014,13.19,4.438.435A2.926,2.926,0,0,0,0,2.966v25.5A2.94,2.94,0,0,0,4.438,31L26.014,18.253a2.939,2.939,0,0,0,0-5.063Z" transform="translate(0 -0.032)" /></svg>
								)
								: (
									<svg id="icon_pause" width="70" height="70" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M13 7h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1m7 0h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1" /></svg>
								)
						}
					</MorphReplace>
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

export default MobileController
