import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { LOGIN } from '../../utils/consts'
import styles from './Login.module.scss'
import Input from '../common/Input'

/**
* @author zilahir
* @function Login
* */

const Login = props => {
	const { type, isVisible } = props
	return (
		<>
			{
				type === LOGIN
					? (
						<div className={classnames(
							styles.loginBoxContainer,
							isVisible ? styles.show : styles.hidden,
						)}
						>
							<Input
								inheritedValue="Email"
								inputClassName={styles.loginInput}
							/>
							<Input
								inheritedValue="Password"
								inputClassName={styles.loginInput}
							/>
						</div>
					)
					: null
			}
		</>
	)
}

Login.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
}

export default Login
