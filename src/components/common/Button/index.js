/* eslint-disable no-nested-ternary */
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { BUTTON, LINK } from '../../../utils/consts'
import styles from './Button.module.scss'

/**
* @author zilahir
* @function Button
* */

const Button = props => {
	const { labelText, onClick, type, buttonClass, isNegative, disabled } = props
	return (
		<>
			{
				type === BUTTON
					? (
						<div className={classnames(
							styles.buttonContainer,
							buttonClass,
						)}
						>
							<button
								type="button"
								disabled={disabled}
								onClick={onClick}
								className={classnames(
									styles.button,
									isNegative ? styles.negative : null,
								)}
							>
								{labelText}
							</button>
						</div>
					)
					: type === LINK
						? (
							<div className={styles.buttonContainer}>
								<button
									type="button"
									onClick={onClick}
									className={styles.linkButton}
								>
									{labelText}
								</button>
							</div>
						)
						: null
			}
		</>
	)
}

Button.defaultProps = {
	buttonClass: null,
	disabled: false,
	isNegative: false,
	type: BUTTON,
}

Button.propTypes = {
	buttonClass: PropTypes.string,
	disabled: PropTypes.bool,
	isNegative: PropTypes.bool,
	labelText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string,
}

export default Button
