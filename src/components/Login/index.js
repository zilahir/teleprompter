/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Icon from 'react-icons-kit'
import { useDispatch, useSelector } from 'react-redux'
import { triangle } from 'react-icons-kit/feather/triangle'
import { trash } from 'react-icons-kit/feather/trash'
import classnames from 'classnames'
import styled from 'styled-components'

import { textState } from '../../store/reducers/text'
import { LOGIN, REGISTER, PASSWORD, LOAD, SAVE, ENTER } from '../../utils/consts'
import styles from './Login.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'
import { authUser, createNewUser } from '../../store/actions/authUser'
import { getAllUserPrompter, setPrompterSlug, setPrompterProjectName, deletePrompter, createNewPrompter } from '../../store/actions/prompter'
import Loader from '../Loader'
import { setFontSize, setLineHeight, setLetterSpacing, setScrollWidth, setScrollSpeed, clearText, toggleMirror, setFont, setTextAlignment } from '../../store/actions/text'
import Modal from '../common/Modal'
import ForgottenPasswordModal from '../ForgottenPasswordModal'
import { setSegments } from '../../store/actions/segments'

/**
* @author zilahir
* @function Login
* */

const BoxContainer = styled.div`
	left: ${props => props.left}px;
`

const Login = props => {
	const { type, isVisible, requestClose, leftPosition } = props
	const dispatch = useDispatch()
	const [projectName, setProjectName] = useState(null)
	const [isLoginError, setLoginError] = useState(false)
	const [chosenEmail, setChosenEmail] = useState(null)
	const [chosenPassword, setChosenPassword] = useState(null)
	const [passwordMismatch, togglePasswordMismatch] = useState(null)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [isSaving, toggleSavingLoader] = useState(false)
	const [isRegistering, toggleRegisteringNewUser] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [isModalOpen, toggleModalOpen] = useState(false)
	const [delProject, setProjectToDel] = useState(null)
	const [showPasswordModal, toggleForgottenPasswordModal] = useState(false)
	const [username, setUsername] = useState(null)
	const { userPrompters, segments, text, user } = useSelector(state => state)

	function handleLogin() {
		Promise.all([
			dispatch(authUser({ email, password })),
		]).then(res => {
			if (res[0].isSuccess) {
				dispatch(getAllUserPrompter(res[0].userId))
				requestClose()
				setEmail(null)
				setPassword(null)
			} else if (res[0].reason === 401 || res[0].reason === 404) {
				setLoginError(true)
			}
		})
	}

	function handleSave() {
		const slug = userPrompters.prompterSlug
		toggleSavingLoader(true)
		const newPrompterObject = text
		const saveObject = {
			slug,
			segments: segments.segments,
			userId: user.user.userId,
			projectName,
			meta: {
				fontSize: newPrompterObject.fontSize,
				lineHeight: newPrompterObject.lineHeight,
				letterSpacing: newPrompterObject.letterSpacing,
				scrollWidth: newPrompterObject.scrollWidth,
				scrollSpeed: newPrompterObject.scrollSpeed,
				isFlipped: newPrompterObject.isFlipped,
				chosenFont: newPrompterObject.chosenFont,
				textAlignment: newPrompterObject.textAlignment,
			},
		}
		Promise.all([
			createNewPrompter(saveObject, user.user.accessToken),
		]).then(() => {
			setTimeout(() => {
				dispatch(getAllUserPrompter(user.user.userId, user.user.accessToken))
				setIsSaved(true)
				toggleSavingLoader(false)
				setTimeout(() => {
					setIsSaved(false)
					requestClose()
				}, 1000)
			}, 1000)
		})
	}

	function handleLoad(prompter) {
		const selectedPrompter = {
			...prompter,
			meta: {
				...prompter.meta,
				...textState,
			},
		}
		dispatch(clearText())
		Promise.all([
			dispatch(setSegments(selectedPrompter.segments)),
			dispatch(setPrompterProjectName(selectedPrompter.projectName)),
			dispatch(setFontSize(selectedPrompter.meta.fontSize)),
			dispatch(setLineHeight(selectedPrompter.meta.lineHeight)),
			dispatch(setFont(selectedPrompter.meta.chosenFont)),
			dispatch(setTextAlignment(selectedPrompter.meta.textAlignment)),
			dispatch(setLetterSpacing(selectedPrompter.meta.letterSpacing)),
			dispatch(setScrollWidth(selectedPrompter.meta.scrollWidth)),
			dispatch(setScrollSpeed(selectedPrompter.meta.scrollSpeed)),
			dispatch(setPrompterSlug(selectedPrompter.slug)),
			dispatch(toggleMirror(selectedPrompter.meta.isFlipped)),
		]).then(() => {
			requestClose()
		})
		return selectedPrompter
	}

	function handleDelete(e, projectToDelete) {
		e.stopPropagation()
		requestClose()
		setProjectToDel(projectToDelete)
		toggleModalOpen(!isModalOpen)
	}

	function handlePrompterDelte(delObject) {
		Promise.all([
			// eslint-disable-next-line no-underscore-dangle
			deletePrompter(delObject._id),
		]).then(() => {
			toggleModalOpen(false)
			dispatch(getAllUserPrompter(user.userId, user.accessToken222))
		})
	}

	function handlePasswordConfirmation(pw) {
		if (pw !== chosenPassword) {
			togglePasswordMismatch(true)
		} else {
			togglePasswordMismatch(false)
		}
	}

	function regNewUser() {
		toggleRegisteringNewUser(true)
		const newUserObject = {
			email: chosenEmail,
			password: chosenPassword,
			username,
		}
		Promise.all([
			createNewUser(newUserObject),
		]).then(() => {
			setTimeout(() => {
				toggleRegisteringNewUser(false)
				setIsRegistered(true)
				setTimeout(() => {
					setIsRegistered(false)
					requestClose()
				}, 1000)
			}, 1000)
		})
	}

	function handleForgotPassword() {
		toggleForgottenPasswordModal(true)
		requestClose()
	}
	return (
		<>
			{
				isVisible
					? ReactDOM.createPortal(
						<div
							onClick={() => requestClose()}
							className={styles.overLay}
							role="button"
							onKeyDown={null}
							tabIndex={-1}
						/>, document.body,
					)
					: null
			}
			{
				type === LOGIN
					? (
						<BoxContainer
							className={classnames(
								styles.loginBoxContainer,
								isVisible ? styles.show : styles.hidden,
							)}
							left={leftPosition}
						>
							<Input
								placeholder="Email"
								inputClassName={styles.loginInput}
								getBackValue={v => setEmail(v)}
							/>
							<Input
								placeholder="Password"
								inputClassName={styles.loginInput}
								getBackValue={v => setPassword(v)}
								hasKeyDownEvent
								keyDownEvent={e => (e.toLowerCase() === ENTER ? handleLogin() : null)}
								inputType={PASSWORD}
							/>
							<Button
								labelText="LOG IN"
								onClick={() => handleLogin()}
								buttonClass={styles.loginBtn}
							/>
							<div
								className={styles.forgottenContainer}
								role="button"
								onKeyDown={null}
								tabIndex={-1}
								onClick={() => handleForgotPassword()}
							>
								<p>
									I forgot my password!
								</p>
							</div>
							<div className={classnames(
								styles.errorContainer,
								!isLoginError ? styles.hidden : null,
							)}
							>
								<p>
									Invalid email or password. Try again.
								</p>
							</div>
						</BoxContainer>
					)
					: type === REGISTER
						? (
							<BoxContainer
								className={classnames(
									styles.loginBoxContainer,
									styles.regContainer,
									isVisible ? styles.show : styles.hidden,
									isRegistering || isRegistered ? styles.registering : null,
								)}
								left={leftPosition}
							>
								{
									isRegistering || isRegistered
										? (
											<Loader
												isLoading={isRegistering}
											/>
										) : (
											<>
												<Input
													placeholder="Email (required)"
													inputClassName={styles.loginInput}
													getBackValue={v => setChosenEmail(v)}
												/>
												<Input
													placeholder="Password  (required min 8 chars)"
													inputClassName={styles.loginInput}
													inputType={PASSWORD}
													getBackValue={v => setChosenPassword(v)}
												/>
												<Input
													placeholder="Confirm password"
													inputClassName={
														passwordMismatch ? styles.loginInputWError : styles.loginInput
													}
													inputType={PASSWORD}
													getBackValue={v => handlePasswordConfirmation(v)}
												/>
												<Input
													placeholder="Username (optional)"
													inputClassName={styles.loginInput}
													getBackValue={v => setUsername(v)}
												/>
												<div className={classnames(
													styles.errorContainer,
													!passwordMismatch ? styles.hidden : null,
												)}
												>
													<p>
														Passwords arent&apos;t matching
													</p>
												</div>

												<div className={styles.additionalInfo}>
													<p>
														By signing up, you agree to our <a href="/policy">Privacy Policy</a>
													</p>
												</div>

												<Button
													labelText="SIGN UP"
													onClick={() => regNewUser()}
													buttonClass={styles.loginBtn}
													disabled={
														!!(passwordMismatch == null || passwordMismatch === true)
													}
												/>
											</>
										)
								}
							</BoxContainer>
						) : type === LOAD
							? (
								<BoxContainer
									className={classnames(
										styles.loginBoxContainer,
										styles.itemBoxContainer,
										isVisible ? styles.show : styles.hidden,
									)}
									left={leftPosition}
								>
									<ul className={styles.savedItems}>
										{
											userPrompters.usersPrompters.map(currItem => (
												<li
													role="button"
													key={currItem.id}
													onKeyPress={null}
													tabIndex={-1}
													onClick={() => handleLoad(currItem)}
												>
													{currItem.projectName}
													<div className={styles.rootIcon}>
														<div
															className={styles.icon}
															role="button"
															onKeyDown={null}
															tabIndex={-1}
															onClick={e => handleDelete(e, currItem)}
														>
															<Icon icon={trash} size="1em" />
														</div>
														<div className={classnames(
															styles.icon,
															styles.rotate,
														)}
														>
															<Icon icon={triangle} size="1em" />
														</div>
													</div>
												</li>
											))
										}
									</ul>
								</BoxContainer>
							) : type === SAVE
								? (
									<BoxContainer
										className={classnames(
											styles.loginBoxContainer,
											styles.itemBoxContainer,
											styles.saveContainer,
											isVisible ? styles.show : styles.hidden,
										)}
										left={leftPosition}
									>
										{
											isSaving || isSaved
												? (
													<>
														<Loader
															isLoading={isSaving}
														/>
														<div className={classnames(
															styles.success,
															isSaved ? styles.show : styles.hidden,
														)}
														>
															<p>
																Saved
															</p>
														</div>
													</>
												)
												: (
													<>
														<Input
															placeholder="Project name"
															inputClassName={styles.loginInput}
															getBackValue={v => setProjectName(v)}
														/>
														<Button
															labelText="SAVE"
															onClick={() => handleSave()}
															buttonClass={styles.loginBtn}
														/>
													</>
												)
										}
									</BoxContainer>
								)
								: null
			}
			<Modal
				isShowing={isModalOpen}
				hide={() => toggleModalOpen(false)}
				hasCloseIcon={false}
				modalTitle="Are you sure you want to delete your project?"
				modalClassName={styles.modal}
			>
				{
					delProject
						? (
							<p>
								{delProject.projectName}
							</p>
						)
						: null
				}
				<div className={styles.buttonContainer}>
					<Button
						labelText="Cancel"
						onClick={() => toggleModalOpen(false)}
						isNegative
					/>
					<Button
						labelText="Delete"
						onClick={() => handlePrompterDelte(delProject)}
					/>
				</div>
			</Modal>
			<ForgottenPasswordModal
				showPasswordModal={showPasswordModal}
				requestClose={() => toggleForgottenPasswordModal(false)}
			/>
		</>
	)
}

Login.defaultProps = {
	leftPosition: 0,
	requestClose: null,
}

Login.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	leftPosition: PropTypes.number,
	requestClose: PropTypes.func,
	type: PropTypes.string.isRequired,
}

export default Login
