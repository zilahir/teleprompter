import React from 'react'
import PropTypes from 'prop-types'

import About from '../About'
import Modal from '../common/Modal'
import styles from './AboutModal.module.scss'

/**
 * @author zilahir
 * @function AboutModal
 * */

const AboutModal = ({
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
			hasCloseIcon={false}
		>
			<About onClose={handleClose} />
		</Modal>
	</>
)

AboutModal.propTypes = {
	handleClose: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	selector: PropTypes.string.isRequired,
}

export default AboutModal
