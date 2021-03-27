import React, { useState, useRef } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import random from 'random'
import shortid from 'shortid'

import { LINK, LOGIN, REGISTER, SAVE, SAVE_AS_COPY, LOAD, NEW_PROMPTER, SEGMENT, colors } from '../../utils/consts'
import Logo from '../common/Logo'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'
import { setPrompterSlug, isProverSaved, updatePrompter } from '../../store/actions/prompter'
import Modal from '../common/Modal'
import UserSettingsModal from '../UserSettingsModal'
import { toggleUpdateBtn } from '../../store/actions/misc'
import { setSegments } from '../../store/actions/segments'
import AboutModal from '../AboutModal'
import HowToUseModal from '../HowToUseModal'

/**
* @author zilahir
* @function ActionHeader
* */

const ActionHeader = () => {
	const [showLogin, toggleLogin] = useState(false)
	const [showRegister, toggleRegister] = useState(false)
	const [showLoad, toggleLoad] = useState(false)
	const [showSave, toggleSave] = useState(false)
	const [showNewModal, toggleNewModal] = useState(false)
	const [userSettingsModalOpen, toggleUserSettingsModal] = useState(false)
	const [boxPosition, setBoxPosition] = useState(0)
	const [isAboutPageVisible, toggleAboutModal] = useState(false)
	const [isHowToUseModalOpen, toggleHowToUseModal] = useState(false)
	const { userPrompters, user, text } = useSelector(store => store)

	const isLoggedIn = user.loggedIn
	const dispatch = useDispatch()
	const projectsBtnRef = useRef(null)
	const saveRef = useRef(null)
	const saveAsRef = useRef(null)
	const loginBtnRef = useRef(null)
	const signUpBtnRef = useRef(null)

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
		isProverSaved(userPrompters.prompterSlug).then(isSavedResult => {
			if (!isSavedResult.isSuccess || target === SAVE_AS_COPY) {
				toggleSave(!showSave)
			} else {
				const slug = userPrompters.prompterSlug
				const updatePrompterObject = text
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
			segmentTitle: '',
			segmentTexűt: '',
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
								disabled={!isLoggedIn}
								isVisible={isLoggedIn}
							/>
						</li>
						<li ref={saveAsRef}>
							<Button
								labelText="Save As..."
								type={LINK}
								onClick={() => openSave(SAVE_AS_COPY)}
								disabled={!isLoggedIn}
								isVisible={isLoggedIn}
							/>
						</li>
						<li ref={projectsBtnRef}>
							<Button
								labelText="Projects"
								type={LINK}
								onClick={() => openLoad()}
								isVisible={
									userPrompters.usersPrompters.length > 0
								}
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
									isLoggedIn ? user.user.email : 'Username'
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
								onClick={() => toggleAboutModal(currState => !currState)}
							/>
						</li>
						<li>
							<Button
								labelText="How to Use"
								type={LINK}
								onClick={() => toggleHowToUseModal(currState => !currState)}
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
			<AboutModal
				isVisible={isAboutPageVisible}
				handleClose={() => toggleAboutModal(false)}
				selector={document.querySelector('#prompter-root')}
			/>
			<HowToUseModal
				isVisible={isHowToUseModalOpen}
				handleClose={() => toggleHowToUseModal(false)}
				selector={document.querySelector('#prompter-root')}
			/>
		</div>
	)
}

export default ActionHeader
