import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { useParams } from 'react-router-dom'
import { useSocket } from '@zilahir/use-socket.io-client'
import classnames from 'classnames'
import styled from 'styled-components'
import { MorphReplace } from 'react-svg-morph'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import FastForwardIcon from '@material-ui/icons/FastForward'
import InfoIcon from '@material-ui/icons/Info'

import styles from './MobileContainer.module.scss'
import arrowBg from '../../assets/controls/bg.svg'
import { REMOTE } from '../../utils/consts'
import Logo from '../common/Logo'

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
	ReactGA.pageview(`${REMOTE}`)
	const { slug } = useParams()
	const [isPlaying, togglePlaying] = useState(false)
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : process.env.REACT_APP_BACKEND_V2)
	function handleStartStop() {
		togglePlaying(!isPlaying)
	}

	function incScrollingSpeed() {
		if (socket) {
			socket.emit('incSpeed', {
				prompterId: slug,
			})
		}
	}

	function decScrollingSpeed() {
		if (socket) {
			socket.emit('decSpeed', {
				prompterId: slug,
			})
		}
	}

	function jumpUp() {
		if (socket) {
			socket.emit('jumpUp', {
				prompterId: slug,
			})
		}
	}

	function jumpDown() {
		if (socket) {
			socket.emit('jumpDown', {
				prompterId: slug,
			})
		}
	}

	useEffect(() => {
		if (socket) {
			socket.emit('isPlaying', {
				prompterId: slug,
				isPlaying,
			})
		}
	}, [isPlaying])

	return (
		<div className={styles.mainContainer}>
			<div className={styles.logoContainer}>
				<Logo />
				<p className={styles.slug}>
					{slug}
					<span className={styles.infoIcon}>
						<InfoIcon htmlColor="#ffffff" />
					</span>
				</p>
			</div>
			<BTN
				className={styles.top}
				role="button"
				onKeyDown={null}
				tabIndex={-1}
				onClick={() => jumpUp()}
			>
				<KeyboardArrowUpIcon fontSize="large" htmlColor="#ffffff" />
			</BTN>
			<div className={styles.middle}>
				<BTN
					className={classnames(
						styles.oneButton,
						styles.dirButton,
					)}
					onClick={() => decScrollingSpeed()}
				>
					<FastRewindIcon htmlColor="#ffffff" />
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
					<MorphReplace
						width={!isPlaying ? 40 : 50}
						height={50}
					>
						{
							!isPlaying
								? (
									<svg key="on" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 30 30"><path fill="#ffffff" d="M26.014,13.19,4.438.435A2.926,2.926,0,0,0,0,2.966v25.5A2.94,2.94,0,0,0,4.438,31L26.014,18.253a2.939,2.939,0,0,0,0-5.063Z" /></svg>
								)
								: (
									<svg key="off" id="icon_pause" width="100" height="100" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M13 7h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1m7 0h-3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1" /></svg>
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
					onClick={() => incScrollingSpeed()}
				>
					<FastForwardIcon htmlColor="#ffffff" />
				</BTN>
			</div>
			<BTN
				className={styles.bottom}
				role="button"
				onKeyDown={null}
				tabIndex={-1}
				onClick={() => jumpDown()}
			>
				<KeyboardArrowDownIcon fontSize="large" htmlColor="#ffffff" />
			</BTN>
		</div>
	)
}

export default MobileController
