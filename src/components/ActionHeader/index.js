/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { LINK, LOGIN, REGISTER, SAVE, SAVE_AS_COPY, LOAD, NEW_PROMPTER, INFOBOX_TOP } from '../../utils/consts'
import Logo from '../common/Logo'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'
import { setPrompterSlug, isProverSaved, updatePrompter } from '../../store/actions/prompter'
import Modal from '../common/Modal'
import { resetPrompter } from '../../store/actions/text'
import UserSettingsModal from '../UserSettingsModal'
import { toggleUpdateBtn } from '../../store/actions/misc'

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
	const [userSettingsModalOpen, toggleUserSettingsModal] = useState(false)

	const store = useStore()
	const dispatch = useDispatch()
	// const isGuideVisible = useSelector(state => state.misc.instructions[INFOBOX_TOP])

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

	function openSave(target) {
		toggleLogin(false)
		toggleRegister(false)
		toggleLoad(false)
		toggleNewModal(false)
		isProverSaved(store.getState().userPrompters.prompterSlug).then(isSavedResult => {
			if (!isSavedResult.isSuccess || target === SAVE_AS_COPY) {
				toggleSave(!showSave)
			} else {
				const slug = store.getState().userPrompters.prompterSlug
				const updatePrompterObject = store.getState().text
				const { user } = store.getState().user
				const saveObject = {
					slug,
					text: updatePrompterObject.text,
					userId: user.userId,
					meta: {
						fontSize: updatePrompterObject.fontSize,
						lineHeight: updatePrompterObject.lineHeight,
						letterSpacing: updatePrompterObject.letterSpacing,
						scrollWidth: updatePrompterObject.scrollWidth,
						scrollSpeed: updatePrompterObject.scrollSpeed,
						isFlipped: updatePrompterObject.isFlipped,
					},
				}
				updatePrompter(saveObject).then(() => {
					// TODO: show success message here
				})
			}
		})
	}

	function toggleConfirmNew() {
		toggleNewModal(true)
		toggleLogin(false)
		toggleRegister(false)
		toggleLoad(false)
		toggleSave(false)
	}

	function clearCurrentPrompter() {
		dispatch(setPrompterSlug(uuidv4().split('-')[0]))
		dispatch(resetPrompter())
		dispatch(toggleUpdateBtn(false))
		toggleNewModal(false)
	}

	function openUserSettingModal() {
		toggleUserSettingsModal(true)
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
		<div
			className={styles.topHeaderRoot}
		>
			<div className={styles.innerContainer}>
				<div className={styles.logoContainer}>
					<Logo />
				</div>
				<div className={styles.middleContainer}>
					<ul className={classnames(
						styles.btnList,
						styles.flexStart,
					)}
					>
						<li>
							<Button
								labelText="New"
								type={LINK}
								onClick={() => toggleConfirmNew()}
							/>
						</li>
						<li>
							<Button
								labelText="Save"
								type={LINK}
							/>
						</li>
						<li>
							<Button
								labelText="Saves As..."
								type={LINK}
							/>
						</li>
						<li>
							<Button
								labelText="Projects"
								type={LINK}
							/>
						</li>
					</ul>
					<ul className={classnames(
						styles.btnList,
						styles.flexEnd,
					)}
					>
						<li>
							<Button
								labelText="Sign Up"
								type={LINK}
							/>
						</li>
						<li>
							<Button
								labelText="Login"
								type={LINK}
								onClick={() => openLoginBox()}
							/>
						</li>
					</ul>
				</div>
				<div className={styles.rightContainer}>
					<ul className={styles.btnList}>
						<li>
							<Button
								labelText="About Prompter.me"
								type={LINK}
							/>
						</li>
						<li>
							<Button
								labelText="How to Use"
								type={LINK}
							/>
						</li>
					</ul>
				</div>
			</div>
			<Login
				isVisible={showLogin}
				type={LOGIN}
				requestClose={() => toggleLogin(false)}
			/>
			<Login
				isVisible={showNewModal}
				type={NEW_PROMPTER}
				requestClose={() => toggleNewModal(false)}
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
