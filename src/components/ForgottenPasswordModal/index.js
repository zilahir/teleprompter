import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import Modal from '../common/Modal'
import styles from './ForgottenPasswordModal.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'
import { requestPasswordRecovery, getToken, sendPasswordRecoveryEmail } from '../../store/actions/user'
import Loader from '../Loader'
import { INLINE_LOADER } from '../../utils/consts'

/**
* @author zilahir
* @function ForgottenPasswordModal
* */

const ForgottenPasswordModal = props => {
	const { showPasswordModal, requestClose } = props
	const [email, setEmail] = useState(null)
	const [isEmailsent, toggleEmailSent] = useState(false)
	const [isLoading, togleLoading] = useState(false)

	function sendForgottenPasswordEmail() {
		const slug = uuidv4().split('-')[0]
		togleLoading(isLoading)
		const requestPassword = requestPasswordRecovery(slug, email)
		requestPassword.then(() => {
			const token = getToken(email)
			token.then(tokenRes => {
				const sendEmail = sendPasswordRecoveryEmail(email, slug, tokenRes.token)
				sendEmail.then(() => {
					toggleEmailSent(true)
				})
			})
		})
	}

	return (
		<>
			<Modal
				isShowing={showPasswordModal}
				hide={requestClose}
				modalClassName={styles.forgottenPasswordModal}
				hasCloseIcon={false}
			>
				{
					!isEmailsent ? (
						<>
							<p>
								Enter your email address, and we will send a recovery email
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
									labelText={
										isLoading ? <Loader width={20} height={20} type={INLINE_LOADER} isLoading={isLoading} /> : 'Send'
									}
									disabled={!email || isLoading}
									onClick={() => sendForgottenPasswordEmail()}
								/>
							</div>
						</>
					) : (
						<div className={styles.emailSentContainer}>
							<p>We have sent you an email. Check your inbox!</p>
							<Button
								labelText="Got it"
								onClick={requestClose}
							/>
						</div>
					)
				}
			</Modal>
		</>
	)
}

ForgottenPasswordModal.propTypes = {
	requestClose: PropTypes.func.isRequired,
	showPasswordModal: PropTypes.bool.isRequired,
}

export default ForgottenPasswordModal
