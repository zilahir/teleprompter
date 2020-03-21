import React, { useEffect, useRef, useState } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
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
	const { text, scrollSpeed, prompterObject, playing } = props
	const controls = useAnimation()
	const textRef = useRef(null)
	const [height, setHeight] = useState(null)
	const [isPlaying, togglePlaying] = useState(playing)
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
	}, [text, isPlaying])

	function handleKeyPress(key, e) {
		e.preventDefault()
		if (key === SPACE) {
			togglePlaying(!isPlaying)
			if (isPlaying) {
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
					transition={{ ease: 'linear', duration: (scrollSpeed * scrollSpeed) * 3 }}
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
	playing: PropTypes.bool.isRequired,
	prompterObject: PropTypes.objectOf(PropTypes.any).isRequired,
	scrollSpeed: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
}

export default TextScroller
