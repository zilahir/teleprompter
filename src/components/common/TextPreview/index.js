import React from 'react'
import PropTypes from 'prop-types'

import styles from './TextPreview.module.scss'

/**
* @author zilahir
* @function TextPreview
* */

const TextPreview = props => {
	const { text } = props
	return (
		<div className={styles.textpreviewContainer}>
			<div className={styles.mirroredContainer}>
				<p className={styles.mirrored}>
					{text}
				</p>
			</div>
			<div className={styles.textContainer}>
				<p className={styles.text}>
					{text}
				</p>
			</div>
		</div>
	)
}

TextPreview.propTypes = {
	text: PropTypes.string.isRequired,
}

export default TextPreview
