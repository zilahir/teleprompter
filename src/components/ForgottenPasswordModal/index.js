import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../common/Modal'

/**
* @author zilahir
* @function ForgottenPasswordModal
* */

const ForgottenPasswordModal = props => {
	const { showPasswordModal, requestClose } = props
	return (
		<>
			<Modal
				isShowing={showPasswordModal}
				hide={requestClose}
			>
				<p>
					Enter your email address, and we will send you a password.
				</p>
			</Modal>
		</>
	)
}

ForgottenPasswordModal.propTypes = {
	requestClose: PropTypes.func.isRequired,
	showPasswordModal: PropTypes.bool.isRequired,
}

export default ForgottenPasswordModal
