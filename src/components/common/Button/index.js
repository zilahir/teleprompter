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
	const {
		labelText,
		onClick,
		type,
		buttonClass,
		isNegative,
		disabled,
		isVisible,
		icon,
	} = props
	return (
		<>
			{
				type === BUTTON && isVisible
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
									icon ? styles.hasIcon : null,
									isNegative ? styles.negative : null,
								)}
							>
								{
									icon
										? (
											<div className={styles.icon}>
												{icon}
											</div>
										) : null
								}
								{labelText}
							</button>
						</div>
					)
					: type === LINK && isVisible
						? (
							<div className={styles.buttonContainer}>
								<button
									type="button"
									onClick={onClick}
									className={styles.linkButton}
									disabled={disabled}
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
	icon: null,
	isNegative: false,
	isVisible: true,
	type: BUTTON,
}

Button.propTypes = {
	buttonClass: PropTypes.string,
	disabled: PropTypes.bool,
	icon: PropTypes.node,
	isNegative: PropTypes.bool,
	isVisible: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
	labelText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string,
}

export default Button
