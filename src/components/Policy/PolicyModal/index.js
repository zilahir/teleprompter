import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../common/Modal'
import styles from '../../AboutModal/AboutModal.module.scss'
import Policy from '..'

const PolicyModal = ({
	isVisible,
	handleClose,
	selector,
}) => (
	<>
		<Modal
			isShowing={isVisible}
			hide={handleClose}
			selector={selector}
			wrapperClassname={styles.aboutModalWrapper}
			overlayClassName={styles.aboutModalOverlay}
			hasCloseIcon
		>
			<Policy
				onClose={handleClose}
			/>
		</Modal>
	</>
)

PolicyModal.propTypes = {
	handleClose: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	selector: PropTypes.string.isRequired,
}

export default PolicyModal
