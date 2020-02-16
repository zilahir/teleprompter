import React, { useState } from 'react'
import classnames from 'classnames'

import { LINK, LOGIN, REGISTER, SAVE, SAVE_AS_COPY, LOAD } from '../../utils/consts'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'

/**
* @author zilahir
* @function ActionHeader
* */

const ActionHeader = () => {
	const [showLogin, toggleLogin] = useState(false)
	const [showRegister, toggleRegister] = useState(false)
	const [showLoad, toggleLoad] = useState(false)
	function openLoginBox() {
		toggleRegister(false)
		toggleLoad(false)
		toggleLogin(!showLogin)
	}
	function openRegisterBox() {
		toggleLogin(false)
		toggleLoad(false)
		toggleRegister(!showRegister)
	}
	function openLoad() {
		toggleLogin(false)
		toggleRegister(false)
		toggleLoad(!showLoad)
	}
	const isLoggedIn = true
	return (
		<div className={classnames(
			styles.actionHeaderContainer,
			!isLoggedIn ? styles.alignEnd : null,
		)}
		>
			{
				isLoggedIn
					? (
						<ul className={styles.loggedInActionList}>
							<li>
								<Button
									labelText="Save"
									onClick={() => null}
									type={LINK}
								/>
							</li>
							<li>
								<Button
									labelText="Save As Copy"
									onClick={() => null}
									type={LINK}
								/>
							</li>
							<li>
								<Button
									labelText="Load"
									onClick={() => openLoad()}
									type={LINK}
								/>
							</li>
						</ul>
					)
					: null
			}
			{
				!isLoggedIn
					? (
						<ul className={styles.actionList}>
							<li>
								<Button
									labelText="Sign Up"
									onClick={() => openRegisterBox()}
									type={LINK}
								/>
							</li>
							<li>
								<Button
									labelText="Login"
									onClick={() => openLoginBox()}
									type={LINK}
								/>
							</li>
						</ul>
					)
					: (
						<ul className={styles.actionList}>
							<li>
								<Button
									labelText="Log Out"
									onClick={() => openRegisterBox()}
									type={LINK}
								/>
							</li>
						</ul>
					)
			}
			<Login
				isVisible={showLogin}
				type={LOGIN}
			/>
			<Login
				isVisible={showRegister}
				type={REGISTER}
			/>
			<Login
				isVisible={showLoad}
				type={LOAD}
			/>
		</div>
	)
}

export default ActionHeader
