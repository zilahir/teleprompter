/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import random from 'random'
import shortid from 'shortid'

import { LINK, LOGIN, REGISTER, SAVE, SAVE_AS_COPY, LOAD, NEW_PROMPTER, INFOBOX_TOP, SEGMENT, colors } from '../../utils/consts'
import Logo from '../common/Logo'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'
import { setPrompterSlug, isProverSaved, updatePrompter } from '../../store/actions/prompter'
import Modal from '../common/Modal'
import { resetPrompter } from '../../store/actions/text'
import UserSettingsModal from '../UserSettingsModal'
import { toggleUpdateBtn } from '../../store/actions/misc'
import { setSegments } from '../../store/actions/segments'

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
	const [boxPosition, setBoxPosition] = useState(0)

	const store = useStore()
	const dispatch = useDispatch()
	const projectsBtnRef = useRef(null)
	const saveRef = useRef(null)
	const saveAsRef = useRef(null)
	const loginBtnRef = useRef(null)
	const signUpBtnRef = useRef(null)
	// const isGuideVisible = useSelector(state => state.misc.instructions[INFOBOX_TOP])

	function openLoginBox() {
		setBoxPosition(loginBtnRef.current.getBoundingClientRect().x)
		toggleRegister(false)
		toggleLoad(false)
		toggleSave(false)
		toggleLogin(!showLogin)
		toggleNewModal(false)
	}

	function openRegisterBox() {
		setBoxPosition(signUpBtnRef.current.getBoundingClientRect().x)
		toggleLogin(false)
		toggleLoad(false)
		toggleSave(false)
		toggleRegister(!showRegister)
		toggleNewModal(false)
	}

	function openLoad() {
		setBoxPosition(projectsBtnRef.current.getBoundingClientRect().x)
		toggleLogin(false)
		toggleRegister(false)
		toggleSave(false)
		toggleLoad(!showLoad)
		toggleNewModal(false)
	}

	function openSave(target) {
		if (target === SAVE) {
			setBoxPosition(saveRef.current.getBoundingClientRect().x)
		} else if (target === SAVE_AS_COPY) {
			setBoxPosition(saveAsRef.current.getBoundingClientRect().x)
		}
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
		dispatch(setSegments([{
			segmentTitle: 'Add segment name',
			segmentText: '',
			segmentColor: colors[random.int(0, colors.length - 1)],
			id: shortid.generate(),
			type: SEGMENT.toLowerCase(),
		}]))
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
						<li ref={saveRef}>
							<Button
								labelText="Save"
								type={LINK}
								onClick={() => openSave(SAVE)}
							/>
						</li>
						<li ref={saveAsRef}>
							<Button
								labelText="Save As..."
								type={LINK}
								onClick={() => openSave(SAVE_AS_COPY)}
							/>
						</li>
						<li ref={projectsBtnRef}>
							<Button
								labelText="Projects"
								type={LINK}
								onClick={() => openLoad()}
								isVisible={isLoadBtnVisible}
							/>
						</li>
					</ul>
					<ul className={classnames(
						styles.btnList,
						styles.flexEnd,
						isLoggedIn ? styles.hidden : undefined,
					)}
					>
						<li ref={signUpBtnRef}>
							<Button
								labelText="Sign Up"
								type={LINK}
								onClick={() => openRegisterBox()}
							/>
						</li>
						<li ref={loginBtnRef}>
							<Button
								labelText="Login"
								type={LINK}
								onClick={() => openLoginBox()}
							/>
						</li>
					</ul>
					<ul className={classnames(
						styles.btnList,
						styles.flexEnd,
						!isLoggedIn ? styles.hidden : undefined,
					)}
					>
						<li>
							<Button
								labelText={
									store.getState().user.loggedIn ? store.getState().user.user.username : 'Username'
								}
								type={LINK}
								onClick={() => openUserSettingModal()}
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
				leftPosition={boxPosition}
			/>
			<Login
				isVisible={showNewModal}
				type={NEW_PROMPTER}
				requestClose={() => toggleNewModal(false)}
			/>
			<Login
				isVisible={showRegister}
				type={REGISTER}
				requestClose={() => toggleRegister(false)}
				leftPosition={boxPosition}
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
			<UserSettingsModal
				showUserSettingsModal={userSettingsModalOpen}
				requestClose={() => toggleUserSettingsModal(false)}
			/>
			<Login
				isVisible={showLoad}
				type={LOAD}
				requestClose={() => toggleLoad(false)}
				leftPosition={boxPosition}
			/>
			<Login
				isVisible={showSave}
				type={SAVE}
				requestClose={() => toggleSave(false)}
				leftPosition={boxPosition}
			/>
		</div>
	)
}

export default ActionHeader
