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
			{text}
		</div>
	)
}

TextPreview.propTypes = {
	text: PropTypes.string.isRequired,
}

export default TextPreview
