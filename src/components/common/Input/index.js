/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './Input.module.scss'

/**
* @author zilahir
* @function Input
* */

const Input = props => {
	const { labelText } = props
	const [value, setValue] = useState(null)
	return (
		<div className={styles.inputContainer}>
			<label className={styles.label}>
				{labelText}
				<input
					className={styles.input}
					type="text"
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
			</label>
		</div>
	)
}

Input.propTypes = {
	labelText: PropTypes.string.isRequired,
}

export default Input
