import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Icon from 'react-icons-kit'
import { alertTriangle } from 'react-icons-kit/feather/alertTriangle'
import classnames from 'classnames'

import Modal from '../common/Modal'
import styles from './UserSettingsModal.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'
import { clearUserPrompters } from '../../store/actions/prompter'
import { logOutUser, checkPassword, deleteAccount, removeUser } from '../../store/actions/authUser'
import Checkbox from '../common/Checkbox'
import { modifyPassword } from '../../store/actions/user'
import { PASSWORD } from '../../utils/consts'

/**
* @author zilahir
* @function UserSettingsModal
* */

const UserSettingsModal = props => {
	const { showUserSettingsModal, requestClose } = props
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState(null)
	const [newPasswordConfirm, setNewPassowrdConfirm] = useState(null)
	const [passwordForAccountDeletion, setPwForAccountDeletion] = useState(null)
	const [isConfirmed, toggleConfirmed] = useState(false)
	const [alertMessage, setAlertMessage] = useState({})
	const { user } = useSelector(store => store)
	const [newUsername, setNewUsername] = useState(
		user.loggedIn
			? user.user.username : '',
	)
	const history = useHistory()
	const dispatch = useDispatch()

	function confirmCheckbox() {
		toggleConfirmed(!isConfirmed)
	}

	function logOut() {
		Promise.all([
			dispatch(clearUserPrompters()),
			dispatch(logOutUser()),
		]).then(() => {
			requestClose()
		})
	}

	function modifyUser() {
		if (isConfirmed) {
			checkPassword({
				email: user.user.email,
				password: passwordForAccountDeletion,
			}).then(res => {
				if (res.isSuccess) {
					deleteAccount(user.user.userId, user.user.accessToken)
						.then(() => {
							dispatch(removeUser())
							history.go()
						})
				}
			})
		} else if (newPassword && newPassword === newPasswordConfirm && newPassword.length > 7) {
			const { accessToken } = user
			const { userId } = user.user

			checkPassword({
				email: user.user.email,
				password: currentPassword,
			}).then(res => {
				if (res.isSuccess) {
					modifyPassword(accessToken, userId, newPassword).then(modRes => {
						if (modRes.data.success) {
							setAlertMessage({
								text: 'Your password had been modified',
								state: 'success',
							})
							setCurrentPassword(null)
							setNewPassword(null)
							setNewPassowrdConfirm(null)
						} else {
							setAlertMessage({
								text: 'There was an error. Try again!',
								state: 'error',
							})
						}
					})
				} else {
					setAlertMessage({
						text: 'Password is not correct',
						state: 'error',
					})
				}
			})
		} else if (newPassword && newPassword !== newPasswordConfirm) {
			setAlertMessage({
				text: 'The passwords does not match!',
				state: 'warning',
			})
		} else if (newPassword && newPassword.length < 8) {
			setAlertMessage({
				text: 'The password must be at least 8 character long',
				state: 'warning',
			})
		}

		setTimeout(() => {
			setAlertMessage({})
		}, 6000)
	}

	return (
		<>
			<Modal
				isShowing={showUserSettingsModal}
				hide={requestClose}
				modalClassName={styles.userSettingsModal}
				hasCloseIcon={false}
			>
				<div className={styles.topContainer}>
					<div className={classnames(
						styles.info,
						!alertMessage.text ? styles.hidden : styles[alertMessage.state],
					)}
					>
						<Icon size="1.5em" icon={alertTriangle} />
						<p>
							{alertMessage.text}
						</p>
					</div>
					<h1>
						{
							user.loggedIn
								? user.user.username : ''
						}
					</h1>
					<h2>
						{
							user.loggedIn
								? user.user.email
								: ''
						}
					</h2>
					<div
						onClick={() => logOut()}
						onKeyDown={null}
						tabIndex={-1}
						role="button"
					>
						<p>
							Log Out
						</p>
					</div>
				</div>
				<div className={styles.innerContainer}>
					<div className={styles.inputContainer}>
						<Input
							labelText="Change username"
							getBackValue={v => setNewUsername(v)}
							inheritedValue={newUsername}
							inputClassName={
								user.loggedIn
									&& newUsername !== user.user.username ? styles.newUsername : null
							}
						/>
					</div>
					<div className={styles.inputContainer}>
						<p>
							Change password
						</p>
						<div>
							<Input
								placeholder="Current password"
								getBackValue={v => setCurrentPassword(v)}
								inputClassName={styles.settingsInput}
								inputType={PASSWORD}
							/>
							<div className={styles.newPasswordContainer}>
								<Input
									placeholder="New Password"
									getBackValue={v => setNewPassword(v)}
									inputClassName={styles.settingsInput}
									inputType={PASSWORD}
								/>
								<Input
									placeholder="Confirm new password"
									getBackValue={v => setNewPassowrdConfirm(v)}
									inputClassName={styles.settingsInput}
									inputType={PASSWORD}
								/>
							</div>
						</div>
					</div>
					<div className={styles.deleteContainer}>
						<p>
							Delete account (please enter your current password to confirm deletion)
						</p>
						<div className={styles.deleteInner}>
							<Input
								placeholder="Current password"
								getBackValue={v => setPwForAccountDeletion(v)}
								inputClassName={styles.settingsInput}
							/>
							<div className={styles.checkBoxContainer}>
								<Checkbox
									checked={isConfirmed}
									onChange={() => confirmCheckbox()}
								/>
								<p>
									I am sure I want to delete my account
								</p>
							</div>
						</div>
					</div>
					<div className={styles.footerBtnContainer}>
						<Button
							labelText="Cancel"
							isNegative
							onClick={requestClose}
							buttonClass={styles.btnClass}
						/>
						<Button
							labelText="Save"
							onClick={() => modifyUser()}
							// disabled={() => validateForm()}
							űdisabled={false}
							buttonClass={styles.btnClass}
						/>
					</div>
				</div>
			</Modal>
		</>
	)
}

UserSettingsModal.propTypes = {
	requestClose: PropTypes.func.isRequired,
	showUserSettingsModal: PropTypes.bool.isRequired,
}

export default UserSettingsModal
