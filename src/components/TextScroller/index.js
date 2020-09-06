/* eslint-disable no-console */
/* eslint-disable consistent-return */
import React, { useRef, useState, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import { useSocket } from '@zilahir/use-socket.io-client'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './TextScroller.module.scss'
import { keyListeners, SPACE, F6, LEFT, RIGHT, DOWN, UP, PAGEUP, PAGE_DOWN, SEGMENT } from '../../utils/consts'
import { toggleFullScreen } from '../../utils/fullScreen'
import { getFontFamily } from '../../utils/getFontFamily'

/**
* @author zilahir
* @function TextScroller
* */

const Segment = styled.div`
	border-color: ${props => props.segmentColor};
`

const Scroller = styled.div`
	max-width: ${props => props.scrollWidth};
`

const Text = styled.p`
	font-size: ${props => props.fontSize}px;
	letter-spacing: ${props => props.letterSpacing}vw;
	line-height: ${props => props.lineHeight};
	transform: ${props => (props.isFlipped ? 'scaleY(-1)' : null)};
	font-family: ${props => props.fontFamily};
`

const useInterval = (callback, delay) => {
	const savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		function tick() {
			savedCallback.current()
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => {
				clearInterval(id)
			}
		}
	}, [delay])
}

const TextScroller = props => {
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND)
	const { segments, scrollSpeed, prompterObject } = props
	const textRef = useRef(null)
	const topRef = useRef(null)
	const bottomRef = useRef(null)
	const [playing, setPlaying] = useState(false)
	const [position, setPosition] = useState(0)
	const [STEP, setStep] = useState(5)
	const [scrollSpeedValue, setScrollSpeedValue] = useState(scrollSpeed)
	const scrollerRef = useRef(null)
	const { slug } = useParams()
	useInterval(() => {
		setPosition(position + STEP)
		scrollerRef.current.scroll({
			top: position,
		})
	}, playing ? scrollSpeedValue : null)

	const togglePlaying = ({ prompterId, isPlaying }) => {
		if (prompterId === slug) {
			setPlaying(isPlaying)
		}
	}

	const incrementSpeed = ({ prompterId }) => {
		if (prompterId === slug) {
			setScrollSpeedValue(scrollSpeedValue - 5)
		}
	}

	const decrementSpeed = ({ prompterId }) => {
		if (prompterId === slug) {
			setScrollSpeedValue(scrollSpeedValue + 5)
		}
	}

	const jumpUp = ({ prompterId }) => {
		if (prompterId === slug) {
			setPosition(currentPosition => currentPosition - 500)
		}
	}

	const jumpDown = ({ prompterId }) => {
		if (prompterId === slug) {
			setPosition(currentPosition => currentPosition + 500)
		}
	}

	useEffect(() => {
		scrollerRef.current.scroll({ top: position })
	}, [position])

	useEffect(() => {
		if (!socket) return
		// socket.emit('room', slug) // TODO: finnish this
		socket.on('isPlaying', togglePlaying)
		socket.on('incSpeed', incrementSpeed)
		socket.on('decSpeed', decrementSpeed)
		socket.on('jumpUp', jumpUp)
		socket.on('jumpDown', jumpDown)
	}, [socket])

	const scrollHandler = event => {
		setPosition(event.currentTarget.scrollTop)
	}

	useEffect(() => {
		scrollerRef.current.addEventListener('scroll', scrollHandler)
		return () => scrollerRef.current.removeEventListener('scroll', scrollHandler)
	}, [])

	useEffect(() => {
		if (prompterObject.isFlipped) {
			console.debug('flipped', true)
			setTimeout(() => {
				setStep(-5)
				bottomRef.current.scrollIntoView({ behavior: 'auto' })
			}, 100)
		}
	}, [prompterObject])

	function handleKeyPress(key, e) {
		e.preventDefault()
		if (key === SPACE) {
			setPlaying(!playing)
		} else if (key === F6) {
			toggleFullScreen()
		} else if (key === LEFT) {
			setScrollSpeedValue(scrollSpeedValue + 5)
		} else if (key === RIGHT) {
			setScrollSpeedValue(scrollSpeedValue - 5)
		} else if (key === DOWN) {
			const newPos = position + 100
			setPosition(newPos)
			scrollerRef.current.scroll({
				top: position + 100,
			})
		} else if (key === UP) {
			const newPos = position - 500
			if (newPos < 0) {
				setPosition(0)
			} else {
				setPosition(newPos)
			}
			scrollerRef.current.scroll({
				top: position - 100,
			})
		} else if (key === PAGEUP) {
			topRef.current.scrollIntoView({ behavior: 'smooth' })
		} else if (key === PAGE_DOWN) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}
	console.debug('scrollSpeed', scrollSpeed)
	return (
		<div className={styles.rootContainer}>
			<Scroller
				className={styles.scrollerContainer}
				scrollWidth={prompterObject.scrollWidth}
				ref={scrollerRef}
			>
				<div ref={topRef} />
				<div
					className={styles.scroller}
				>
					<p
						ref={textRef}
					>
						{
							segments.map(currSegment => (
								currSegment.type === SEGMENT.toLowerCase() ? (
									<Segment
										segmentColor={currSegment.segmentColor}
										className={styles.segment}
										key={currSegment.id}
									>
										<div className={styles.segmentTitleContainer}>
											<p>
												{currSegment.segmentTitle}
											</p>
										</div>
										<div className={styles.segmentTextContainer}>
											<Text
												fontSize={String(prompterObject.fontSize * 50)}
												lineHeight={prompterObject.lineHeight}
												letterSpacing={prompterObject.letterSpacing}
												isFlipped={prompterObject.isFlipped}
												fontFamily={getFontFamily(prompterObject.chosenFont)}
											>
												{currSegment.segmentText}
											</Text>
										</div>
										<div className={styles.segmentTitleContainer}>
											<p>
												{currSegment.segmentTitle}
											</p>
										</div>
									</Segment>
								) : undefined
							))
						}
					</p>
				</div>
				<div ref={bottomRef} />
			</Scroller>
			<KeyboardEventHandler
				handleKeys={[...keyListeners]}
				onKeyEvent={(key, e) => handleKeyPress(key, e, position)}
			/>
		</div>
	)
}

TextScroller.propTypes = {
	prompterObject: PropTypes.objectOf(PropTypes.any).isRequired,
	scrollSpeed: PropTypes.number.isRequired,
	segments: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.any,
		),
	).isRequired,
}

export default TextScroller
