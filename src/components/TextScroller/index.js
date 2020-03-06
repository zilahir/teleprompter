import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'

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
			y: -height,
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
				transition={{ ease: "easeOut", duration: 100 }}
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
