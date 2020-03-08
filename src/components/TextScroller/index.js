import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'

import styles from './TextScroller.module.scss'

/**
* @author zilahir
* @function TextScroller
* */

const TextScroller = props => {
	const { text, scrollSpeed, isPlaying } = props
	const controls = useAnimation()
	const textRef = useRef(null)
	const [height, setHeight] = useState(null)

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
		// controls.start('end')
	}, [text])

	return (
		<>
			<motion.div
				animate={controls}
				variants={container}
				transition={{ ease: 'linear', duration: scrollSpeed || 100 }}
				className={styles.scroller}
			>
				<p
					ref={textRef}
				>
					{text}
				</p>
			</motion.div>
		</>
	)
}

TextScroller.propTypes = {
	isPlaying: PropTypes.bool.isRequired,
	scrollSpeed: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
}

export default TextScroller
