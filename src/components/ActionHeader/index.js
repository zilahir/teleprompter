import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useStore, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line no-unused-vars
import { LINK, LOGIN, REGISTER, SAVE, SAVE_AS_COPY, LOAD, NEW_PROMPTER } from '../../utils/consts'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'
import { logOutUser } from '../../store/actions/authUser'
import { clearUserPrompters, setPrompterSlug } from '../../store/actions/prompter'
import Modal from '../common/Modal'
import { resetPrompter } from '../../store/actions/text'

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
	const [showNewModal, toggleNewModal] = useState(false)
	const [isLoadBtnVisible, setIsLoadVisible] = useState(false)

	const store = useStore()
	const dispatch = useDispatch()

	function openLoginBox() {
		toggleRegister(false)
		toggleLoad(false)
		toggleSave(false)
		toggleLogin(!showLogin)
		toggleNewModal(false)
	}

	function openRegisterBox() {
		toggleLogin(false)
		toggleLoad(false)
		toggleSave(false)
		toggleRegister(!showRegister)
		toggleNewModal(false)
	}

	function openLoad() {
		toggleLogin(false)
		toggleRegister(false)
		toggleSave(false)
		toggleLoad(!showLoad)
		toggleNewModal(false)
	}

	function openSave() {
		toggleLogin(false)
		toggleRegister(false)
		toggleLoad(false)
		toggleSave(!showSave)
		toggleNewModal(false)
	}

	function toggleConfirmNew() {
		toggleNewModal(true)
		toggleLogin(false)
		toggleRegister(false)
		toggleLoad(false)
		toggleSave(false)
	}

	function clearCurrentPrompter() {
		dispatch(setPrompterSlug(uuidv4()))
		dispatch(resetPrompter())
		toggleNewModal(false)
	}

	function logOut() {
		Promise.all([
			dispatch(clearUserPrompters()),
			dispatch(logOutUser()),
		])
	}

	useEffect(() => store.subscribe(() => {
		const savedPrompters = store.getState().userPrompters.usersPrompters.length
		setIsLoadVisible(savedPrompters)
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
									labelText="New"
									onClick={() => toggleConfirmNew()}
									type={LINK}
								/>
							</li>
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
									isVisible={isLoadBtnVisible}
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
				isVisible={showNewModal}
				type={NEW_PROMPTER}
				requestClose={() => toggleNewModal(false)}
			/>
			<Login
				isVisible={showLogin}
				type={LOGIN}
				requestClose={() => toggleLogin(false)}
			/>
			<Login
				isVisible={showRegister}
				type={REGISTER}
				requestClose={() => toggleRegister(false)}
			/>
			<Login
				isVisible={showLoad}
				type={LOAD}
				requestClose={() => toggleLoad(false)}
				noPadding
			/>
			<Login
				isVisible={showSave}
				type={SAVE}
				requestClose={() => toggleSave(false)}
			/>
			<Modal
				isShowing={showNewModal}
				hide={() => toggleNewModal(false)}
				hasCloseIcon={false}
				modalTitle="You have unsaved content in your open project. Are you sure you want to clear everything and start a new one?"
				modalClassName={styles.modal}
			>
				<div className={styles.buttonContainer}>
					<Button
						labelText="Cancel"
						onClick={() => toggleNewModal(false)}
						isNegative
					/>
					<Button
						labelText="Clear"
						onClick={() => clearCurrentPrompter()}
					/>
				</div>
			</Modal>
		</div>
	)
}

export default ActionHeader
