/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-icons-kit'
import { useDispatch, useStore } from 'react-redux'
import { triangle } from 'react-icons-kit/feather/triangle'
import { trash } from 'react-icons-kit/feather/trash'
import classnames from 'classnames'

import { LOGIN, REGISTER, PASSWORD, LOAD, SAVE } from '../../utils/consts'
import styles from './Login.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'
import { authUser, createNewUser } from '../../store/actions/authUser'
import { getAllUserPrompter, setPrompterSlug, setPrompterProjectName, deletePrompter, createNewPrompter } from '../../store/actions/prompter'
import Loader from '../Loader'
import { setFontSize, setLineHeight, setLetterSpacing, setScrollWidth, setScrollSpeed, clearText, setText, toggleMirror } from '../../store/actions/text'
import Modal from '../common/Modal'
import { apiEndpoints } from '../../utils/apiEndpoints'

/**
* @author zilahir
* @function Login
* */

const Login = props => {
	const { type, isVisible, requestClose } = props
	const dispatch = useDispatch()
	const store = useStore()
	const [projectName, setProjectName] = useState(null)
	const [isLoginError, setLoginError] = useState(false)
	const [chosenEmail, setChosenEmail] = useState(null)
	const [chosenPassword, setChosenPassword] = useState(null)
	const [confirmedPassowrd, setConfirmedPassword] = useState(null)
	const [passwordMismatch, togglePasswordMismatch] = useState(null)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [isSaving, toggleSavingLoader] = useState(false)
	const [isRegistering, toggleRegisteringNewUser] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [isModalOpen, toggleModalOpen] = useState(false)
	const [delProject, setProjectToDel] = useState(null)
	function handleLogin() {
		Promise.all([
			dispatch(authUser({ email, password })),
		]).then(res => {
			if (res[0].isSuccess) {
				dispatch(getAllUserPrompter('5e63f4ba19a0555a4fbbe5da')) // TODO: add auth user id here
				requestClose()
				setEmail(null)
				setPassword(null)
			} else if (res[0].reason === 401 || res[0].reason === 404) {
				setLoginError(true)
			}
		})
	}

	function handleSave() {
		toggleSavingLoader(true)
		const newPrompterObject = store.getState().text
		const { user } = store.getState().user
		const slug = store.getState().userPrompters.prompterSlug
		const saveObject = {
			slug,
			text: newPrompterObject.text,
			userId: '5e63f4ba19a0555a4fbbe5da',
			projectName: `project_${slug}`,
			meta: {
				fontSize: newPrompterObject.fontSize,
				lineHeight: newPrompterObject.lineHeight,
				letterSpacing: newPrompterObject.letterSpacing,
				scrollWidth: newPrompterObject.scrollWidth,
				scrollSpeed: newPrompterObject.scrollSpeed,
				isFlipped: newPrompterObject.isFlipped,
			},
		}
		Promise.all([
			createNewPrompter(saveObject, user.accessToken, apiEndpoints.newPrompter),
		]).then(() => {
			setTimeout(() => {
				setIsSaved(true)
				toggleSavingLoader(false)
				setTimeout(() => {
					setIsSaved(false)
					requestClose()
				}, 1000)
			}, 1000)
		})
	}

	function handleLoad(selectedPrompter) {
		dispatch(clearText())
		Promise.all([
			dispatch(setText(selectedPrompter.text)),
			dispatch(setPrompterProjectName(selectedPrompter.projectName)),
			dispatch(setFontSize(selectedPrompter.meta.fontSite)),
			dispatch(setLineHeight(selectedPrompter.meta.lineHeight)),
			dispatch(setLetterSpacing(selectedPrompter.meta.letterPacing)),
			dispatch(setScrollWidth(selectedPrompter.meta.scrollWidth)),
			dispatch(setScrollSpeed(selectedPrompter.meta.scrollSpeed)),
			dispatch(setPrompterSlug(selectedPrompter.id)),
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
			deletePrompter(delObject._id),
		]).then(() => {
			toggleModalOpen(false)
		})
	}

	function handlePasswordConfirmation(pw) {
		setConfirmedPassword(pw)
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
								placeholder="Email"
								inputClassName={styles.loginInput}
								getBackValue={v => setEmail(v)}
							/>
							<Input
								placeholder="Password"
								inputClassName={styles.loginInput}
								getBackValue={v => setPassword(v)}
							/>
							<Button
								labelText="LOG IN"
								onClick={() => handleLogin()}
								buttonClass={styles.loginBtn}
							/>
							<div className={classnames(
								styles.errorContainer,
								!isLoginError ? styles.hidden : null,
							)}
							>
								<p>
									Invalid email or password. Try again.
								</p>
							</div>
						</div>
					)
					: type === REGISTER
						? (
							<div className={classnames(
								styles.loginBoxContainer,
								styles.regContainer,
								isVisible ? styles.show : styles.hidden,
								isRegistering || isRegistered ? styles.registering : null,
							)}
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
													placeholder="Password  (requited min 8 chars)"
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
								</div>
							) : type === SAVE
								? (
									<div className={classnames(
										styles.loginBoxContainer,
										styles.itemBoxContainer,
										styles.saveContainer,
										isVisible ? styles.show : styles.hidden,
									)}
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
									</div>
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
