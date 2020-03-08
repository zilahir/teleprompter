/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-icons-kit'
import { useDispatch, useStore } from 'react-redux'
import { triangle } from 'react-icons-kit/feather/triangle'
import classnames from 'classnames'

import { LOGIN, REGISTER, PASSWORD, LOAD, SAVE } from '../../utils/consts'
import styles from './Login.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'
import { authUser } from '../../store/actions/authUser'
import { getAllUserPrompter } from '../../store/actions/prompter'

/**
* @author zilahir
* @function Login
* */

const Login = props => {
	const { type, isVisible, requestClose } = props
	const dispatch = useDispatch()
	const store = useStore()
	function handleLogin() {
		Promise.all([
			dispatch(authUser({ email: 'zilahi@gmail.com', password: 'demo' })),
		]).then(() => {
			dispatch(getAllUserPrompter('5e63f4ba19a0555a4fbbe5da'))
			requestClose()
		})
	}
	const { usersPrompters } = store.getState().userPrompters
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
							<Button
								labelText="LOG IN"
								onClick={() => handleLogin()}
								buttonClass={styles.loginBtn}
							/>
						</div>
					)
					: type === REGISTER
						? (
							<div className={classnames(
								styles.loginBoxContainer,
								isVisible ? styles.show : styles.hidden,
							)}
							>
								<Input
									inheritedValue="Email (required)"
									inputClassName={styles.loginInput}
								/>
								<Input
									inheritedValue="Password  (requited min 8 chars)"
									inputClassName={styles.loginInput}
									type={PASSWORD}
								/>
								<Input
									inheritedValue="Password  (again)"
									inputClassName={styles.loginInput}
									type={PASSWORD}
								/>
								<Button
									labelText="LOG IN"
									onClick={() => null}
									buttonClass={styles.loginBtn}
								/>
							</div>
						) : type === LOAD
							? (
								<div className={classnames(
									styles.loginBoxContainer,
									styles.itemBoxContainer,
									isVisible ? styles.show : styles.hidden,
								)}
								>
									<ul className={styles.savedItems}>
										{
											usersPrompters.map(currItem => (
												<li key={currItem.id}>
													Project name
													<div className={styles.icon}>
														<Icon icon={triangle} size="1em" />
													</div>
												</li>
											))
										}
									</ul>
								</div>
							) : type === SAVE
								? (
									<div className={classnames(
										styles.loginBoxContainer,
										styles.itemBoxContainer,
										isVisible ? styles.show : styles.hidden,
									)}
									>
										<Input
											inheritedValue="Project name"
											inputClassName={styles.loginInput}
										/>
										<Button
											labelText="SAVE"
											onClick={() => null}
											buttonClass={styles.loginBtn}
										/>
									</div>
								)
								: null
			}
		</>
	)
}

Login.defaultProps = {
	requestClose: null,
}

Login.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	requestClose: PropTypes.func,
	type: PropTypes.string.isRequired,
}

export default Login
