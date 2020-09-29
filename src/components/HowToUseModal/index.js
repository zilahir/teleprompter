import React from 'react'
import PropTypes from 'prop-types'
import { Row, Container, Col } from 'react-grid-system'
import CloseIcon from '@material-ui/icons/Close'
import classnames from 'classnames'

import styles from '../Policy/Policy.module.scss'
import aboutStyles from '../AboutModal/AboutModal.module.scss'
import Modal from '../common/Modal'

/**
* @author zilahir
* @function HowToUseModal
* */

const HowToUseModal = ({
	isVisible,
	handleClose,
	selector,
}) => (
	<Modal
		isShowing={isVisible}
		hide={handleClose}
		selector={selector}
		hasCloseIcon={false}
		wrapperClassname={aboutStyles.aboutModalWrapper}
		overlayClassName={aboutStyles.aboutModalOverlay}

	>
		<div className={classnames(
			styles.aboutWrapper,
			styles.about,
		)}
		>
			<Container
				fluid
			>
				<Row>
					<Col
						className={styles.middle}
						lg={12}
					>
						<div className={styles.closeBtnContainer}>
							<button
								type="button"
								onClick={handleClose}
								className={styles.closeBtn}
							>
								<CloseIcon htmlColor="#ffffff" />
							</button>
						</div>
						<div className={styles.textContainer}>
							<h1 className={styles.title}>
								How to use Prompter.me?
							</h1>
							<p>
								Prompter.me is a free, <a href="https://github.com/zilahir/teleprompter">open source</a> teleprompter on the web. Using it doesn&apos;t
								require you to download anything or to sign up for anything.
								It was made to give content creators an actually useful free teleprompter,
								which would allow them to use it on their own without any additional apps or hacks.
								After all, a lot of video content creators out there are one-person operations,
								and we know using a prompter without help can be a real pain in the tuchus.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	</Modal>
)

HowToUseModal.propTypes = {
	handleClose: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	selector: PropTypes.string.isRequired,
}

export default HowToUseModal
