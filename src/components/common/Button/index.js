import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.module.scss'

/**
* @author zilahir
* @function Button
* */

const Button = props => {
	const { labelText, onClick } = props
	return (
		<div className={styles.buttonContainer}>
			<button
				type="button"
				onClick={onClick}
				className={styles.button}
			>
				{labelText}
			</button>
		</div>
	)
}

Button.propTypes = {
	labelText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Button
