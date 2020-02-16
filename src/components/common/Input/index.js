/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './Input.module.scss'

/**
* @author zilahir
* @function Input
* */

const Input = props => {
	const { labelText, isDisabled, inheritedValue } = props
	const [value, setValue] = useState(null)
	return (
		<div className={styles.inputContainer}>
			<label className={styles.label}>
				<span className={styles.labelText}>
					{labelText}
				</span>
				<input
					className={styles.input}
					type="text"
					onChange={e => setValue(e.target.value)}
					value={value || inheritedValue}
					disabled={isDisabled}
				/>
			</label>
		</div>
	)
}

Input.defaultProps = {
	inheritedValue: '',
	isDisabled: false,
}

Input.propTypes = {
	inheritedValue: PropTypes.string,
	isDisabled: PropTypes.bool,
	labelText: PropTypes.string.isRequired,
}

export default Input
