/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStore, useDispatch } from 'react-redux'

import Modal from '../common/Modal'
import styles from './UserSettingsModal.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'
import { clearUserPrompters } from '../../store/actions/prompter'
import { logOutUser } from '../../store/actions/authUser'

/**
* @author zilahir
* @function UserSettingsModal
* */

const UserSettingsModal = props => {
	const { showUserSettingsModal, requestClose } = props
	const [currentPassword, setCurrentPassword] = useState(null)
	const [newPassword, setNewPassword] = useState(null)
	const [newPasswordConfirm, setNewPassowrdConfirm] = useState(null)

	const store = useStore()
	const dispatch = useDispatch()

	function validateForm() {
		const result = false
		return result
	}

	function logOut() {
		Promise.all([
			dispatch(clearUserPrompters()),
			dispatch(logOutUser()),
		])
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
					<h1>
						Username
					</h1>
					<p>
						Log Out
					</p>
				</div>
				<div className={styles.inputContainer}>
					<Input
						labelText="Change username"
						inheritedValue="Username"
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
						/>
						<Input
							placeholder="New Password"
							getBackValue={v => setNewPassword(v)}
						/>
						<Input
							placeholder="Confirm new password"
							getBackValue={v => setNewPassowrdConfirm(v)}
						/>

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
						onClick={null}
						disabled={() => validateForm()}
						buttonClass={styles.btnClass}
					/>
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
