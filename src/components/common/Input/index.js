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
	const {
		labelText,
		isDisabled,
		inheritedValue,
		inputClassName,
		inputType,
		getBackValue,
		placeholder,
		children,
		hasKeyDownEvent,
		keyDownEvent,
		onFocusOut,
	} = props
	const [value, setValue] = useState(null)

	function handleChange(v) {
		setValue(v)
		if (getBackValue) {
			getBackValue(v)
		}
	}
	return (
		<div className={classnames(
			styles.inputContainer,
			inputClassName,
		)}
		>
			<label className={styles.label}>
				{
					labelText && (
						<span className={styles.labelText}>
							{labelText}
							{
								children && children
							}
						</span>
					)
				}
				<input
					className={styles.input}
					type={inputType.toLowerCase()}
					onChange={e => handleChange(e.target.value)}
					value={value || inheritedValue}
					disabled={isDisabled}
					placeholder={placeholder}
					onKeyDown={e => (hasKeyDownEvent ? keyDownEvent(e.key) : null)}
					onBlur={onFocusOut}
				/>
			</label>
		</div>
	)
}

Input.defaultProps = {
	children: null,
	getBackValue: null,
	hasKeyDownEvent: false,
	inheritedValue: '',
	inputClassName: null,
	inputType: 'text',
	isDisabled: false,
	keyDownEvent: null,
	labelText: '',
	onFocusOut: () => {},
	placeholder: '',
}

Input.propTypes = {
	children: PropTypes.node,
	getBackValue: PropTypes.func,
	hasKeyDownEvent: PropTypes.bool,
	inheritedValue: PropTypes.string,
	inputClassName: PropTypes.string,
	inputType: PropTypes.string,
	isDisabled: PropTypes.bool,
	keyDownEvent: PropTypes.func,
	labelText: PropTypes.string,
	onFocusOut: PropTypes.func,
	placeholder: PropTypes.string,
}

export default Input
