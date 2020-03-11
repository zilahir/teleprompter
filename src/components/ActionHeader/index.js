import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useStore, useDispatch } from 'react-redux'

import { LINK, LOGIN, REGISTER, SAVE, SAVE_AS_COPY, LOAD, LOGGED_IN } from '../../utils/consts'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'
import { logOutUser } from '../../store/actions/authUser'
import { clearUserPrompters } from '../../store/actions/prompter'

/**
* @author zilahir
* @function ActionHeader
* */

const ActionHeader = () => {
	const [showLogin, toggleLogin] = useState(false)
	const [showRegister, toggleRegister] = useState(false)
	const [showLoad, toggleLoad] = useState(false)
	const [showSave, toggleSave] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const store = useStore()
	const dispatch = useDispatch()
	function openLoginBox() {
		toggleRegister(false)
		toggleLoad(false)
		toggleSave(false)
		toggleLogin(!showLogin)
	}
	function openRegisterBox() {
		toggleLogin(false)
		toggleLoad(false)
		toggleSave(false)
		toggleRegister(!showRegister)
	}
	function openLoad() {
		toggleLogin(false)
		toggleRegister(false)
		toggleSave(false)
		toggleLoad(!showLoad)
	}
	function openSave() {
		toggleLogin(false)
		toggleRegister(false)
		toggleLoad(false)
		toggleSave(!showSave)
	}
	function logOut() {
		Promise.all([
			dispatch(clearUserPrompters()),
			dispatch(logOutUser()),
		])
	}
	function requestClose(val) {
		return true
	}
	useEffect(() => store.subscribe(() => {
		if (store.getState().user.loggedIn) {
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
		}
	}), [isLoggedIn])

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
									onClick={() => openSave()}
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
									onClick={() => logOut()}
									type={LINK}
								/>
							</li>
						</ul>
					)
			}
			<Login
				isVisible={showLogin}
				type={LOGIN}
				requestClose={() => toggleLogin(false)}
			/>
			<Login
				isVisible={showRegister}
				type={REGISTER}
			/>
			<Login
				isVisible={showLoad}
				type={LOAD}
				requestClose={() => toggleLoad(false)}
			/>
			<Login
				isVisible={showSave}
				type={SAVE}
				requestClose={() => toggleSave(false)}
			/>
		</div>
	)
}

export default ActionHeader
