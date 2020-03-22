import React, { useEffect, useRef, useState } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import useSocket from 'use-socket.io-client'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'

import styles from './TextScroller.module.scss'
import { keyListeners, SPACE, F6 } from '../../utils/consts'
import { toggleFullScreen } from '../../utils/fullScreen'

/**
* @author zilahir
* @function TextScroller
* */

const Scroller = styled.div`
	max-width: ${props => props.scrollWidth};
	p {
		font-size: ${props => props.fontSize}px;
		letter-spacing: ${props => props.letterSpacing}vw;
		line-height: ${props => props.lineHeight};
	}
`

const TextScroller = props => {
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NODE_ENV === 'production')
	const { text, scrollSpeed, prompterObject } = props
	const controls = useAnimation()
	const textRef = useRef(null)
	const [height, setHeight] = useState(null)
	const [playing, togglePlaying] = useState(false)
	const container = {
		start: {
			y: 0,
		},
		end: {
			y: -height - 100,
		},
	}

	useEffect(() => {
		const { clientHeight } = textRef.current
		setHeight(clientHeight)
	}, [text])

	socket.on('isPlaying', ({ prompterId, isPlaying }) => {
		togglePlaying(isPlaying)
		console.debug(`prompterId: ${prompterId}, isPlaying: ${isPlaying}`)
	})

	function handleKeyPress(key, e) {
		e.preventDefault()
		if (key === SPACE) {
			togglePlaying(!playing)
			if (playing) {
				controls.stop()
			} else {
				controls.start('end')
			}
		} else if (key === F6) {
			toggleFullScreen()
		}
	}
	return (
		<>
			<Scroller
				className={styles.scrollerContainer}
				fontSize={prompterObject.fontSize * 10}
				lineHeight={prompterObject.lineHeight}
				letterSpacing={prompterObject.letterSpacing}
				scrollWidth={prompterObject.scrollWidth}
			>
				<motion.div
					animate={controls}
					variants={container}
					transition={{ ease: 'linear', duration: (scrollSpeed * scrollSpeed) * 0.5 }}
					className={styles.scroller}
				>
					<p
						ref={textRef}
					>
						{text}
					</p>
				</motion.div>
			</Scroller>
			<KeyboardEventHandler
				handleKeys={[...keyListeners]}
				onKeyEvent={(key, e) => handleKeyPress(key, e)}
			/>
		</>
	)
}

TextScroller.propTypes = {
	prompterObject: PropTypes.objectOf(PropTypes.any).isRequired,
	scrollSpeed: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
}

export default TextScroller
