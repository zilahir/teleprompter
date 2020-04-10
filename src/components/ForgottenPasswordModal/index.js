import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from '../common/Modal'
import styles from './ForgottenPasswordModal.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'

/**
* @author zilahir
* @function ForgottenPasswordModal
* */

const ForgottenPasswordModal = props => {
	const { showPasswordModal, requestClose } = props
	const [email, setEmail] = useState(null)

	function sendForgottenPasswordEmail() {
		// eslint-disable-next-line no-console
		console.debug('email', email)
	}
	return (
		<>
			<Modal
				isShowing={showPasswordModal}
				hide={requestClose}
				modalClassName={styles.forgottenPasswordModal}
				hasCloseIcon={false}
			>
				<p>
					Enter your email address, and we will send you a password.
				</p>
				<div className={styles.inputContainer}>
					<Input
						placeholder="Email"
						inputClassName={styles.input}
						getBackValue={v => setEmail(v)}
					/>
				</div>
				<div className={styles.btnContainer}>
					<Button
						labelText="Cancel"
						onClick={requestClose}
						isNegative
					/>
					<Button
						labelText="Send"
						disabled={!email || false}
						onClick={() => sendForgottenPasswordEmail()}
					/>
				</div>
			</Modal>
		</>
	)
}

ForgottenPasswordModal.propTypes = {
	requestClose: PropTypes.func.isRequired,
	showPasswordModal: PropTypes.bool.isRequired,
}

export default ForgottenPasswordModal
