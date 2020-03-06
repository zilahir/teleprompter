import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'

import styles from './TextScroller.module.scss'

/**
* @author zilahir
* @function TextScroller
* */

const TextScroller = props => {
	const { text } = props
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
		console.debug('container', clientHeight)
		setTimeout(() => {
			controls.start('end')
		}, 100)
	}, [text])
	return (
		<>
			<motion.div
				animate={controls}
				variants={container}
				transition={{ ease: 'linear', duration: 10 }}
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
	text: PropTypes.string.isRequired,
}

export default TextScroller
