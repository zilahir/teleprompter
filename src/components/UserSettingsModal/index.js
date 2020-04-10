/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'react-redux'

import Modal from '../common/Modal'
import styles from './UserSettingsModal.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'

/**
* @author zilahir
* @function UserSettingsModal
* */

const UserSettingsModal = props => {
	const { showUserSettingsModal, requestClose } = props
	const [currentPassword, setCurrentPassword] = useState(null)
	const [newPassword, setNewPassword] = useState(null)
	const [newPasswordConfirm, setNewPassowrdConfirm] = useState(null)

	function validateForm() {
		const result = false
		return result
	}

	const store = useStore()
	return (
		<>
			<Modal
				isShowing={showUserSettingsModal}
				hide={requestClose}
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
					/>
					<Button
						labelText="Save"
						onClick={null}
						disabled={() => validateForm()}
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
