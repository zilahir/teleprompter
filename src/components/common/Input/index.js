/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './Input.module.scss'

/**
* @author zilahir
* @function Input
* */

const Input = props => {
	const { labelText, isDisabled, inheritedValue, inputClassName } = props
	const [value, setValue] = useState(null)
	return (
		<div className={classnames(
			styles.inputContainer,
			inputClassName,
		)}
		>
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
	inputClassName: null,
	isDisabled: false,
	labelText: '',
}

Input.propTypes = {
	inheritedValue: PropTypes.string,
	inputClassName: PropTypes.string,
	isDisabled: PropTypes.bool,
	labelText: PropTypes.string,
}

export default Input
