/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'

import { BUTTON, LINK } from '../../../utils/consts'
import styles from './Button.module.scss'

/**
* @author zilahir
* @function Button
* */

const Button = props => {
	const { labelText, onClick, type } = props
	return (
		<>
			{
				type === BUTTON
					? (
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
	type: BUTTON,
}

Button.propTypes = {
	labelText: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string,
}

export default Button
