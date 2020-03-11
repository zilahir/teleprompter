/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
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
import { getAllUserPrompter, setPrompterSlug, setPrompterProjectName } from '../../store/actions/prompter'
import Loader from '../Loader'
import { setFontSize, setLineHeight, setLetterSpacing, setScrollWidth, setScrollSpeed, clearText, setText } from '../../store/actions/text'

/**
* @author zilahir
* @function Login
* */

const Login = props => {
	const { type, isVisible, requestClose } = props
	const dispatch = useDispatch()
	const store = useStore()
	const [projectName, setProjectName] = useState(null)
	const [isSaving, toggleSavingLoader] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	function handleLogin() {
		Promise.all([
			dispatch(authUser({ email: 'zilahi@gmail.com', password: 'demo' })),
		]).then(() => {
			dispatch(getAllUserPrompter('5e63f4ba19a0555a4fbbe5da'))
			requestClose()
		})
	}

	function handleSave() {
		const saveObject = {
			projectName,
			prompterSlug: store.getState().userPrompters.prompterSlug.split('-')[0],
		}
		// requestClose()
		toggleSavingLoader(true)
		setTimeout(() => {
			setIsSaved(true)
		}, 1000)
		console.debug('saveObject', saveObject)
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
		]).then((res) => {
			requestClose()
		})
		return selectedPrompter
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
												<li
													role="button"
													key={currItem.id}
													onKeyPress={null}
													tabIndex={-1}
													onClick={() => handleLoad(currItem)}
												>
													{currItem.projectName}
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
										styles.saveContainer,
										isVisible ? styles.show : styles.hidden,
									)}
									>
										{
											isSaving
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
															inheritedValue="Project name"
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
