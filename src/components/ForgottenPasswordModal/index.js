import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../common/Modal'

/**
* @author zilahir
* @function ForgottenPasswordModal
* */

const ForgottenPasswordModal = props => {
	const { showPasswordModal } = props
	return (
		<>
			<Modal
				isShowing={showPasswordModal}
			>
				<p>
					Enter your email address, and we will send you a password.
				</p>
			</Modal>
		</>
	)
}

ForgottenPasswordModal.propTypes = {
	showPasswordModal: PropTypes.bool.isRequired,
}

export default ForgottenPasswordModal
