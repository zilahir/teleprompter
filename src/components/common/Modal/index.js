import React from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import propTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'

import ModalStyle from './Modal.module.scss'

const ModalOverlay = styled.div`
	background: ${props => props.overlayColor};
`

const Modal = (
	{
		isShowing,
		hide,
		children,
		modalClassName,
		overlayClassName,
		modalTitle,
		overlayColor,
		hasCloseIcon,
		selector,
		wrapperClassname,
	},
) => (isShowing ? ReactDOM.createPortal(
	<>
		<ModalOverlay
			overlayColor={overlayColor}
			className={overlayClassName}
			onClick={hide}
		/>
		<div
			className={classnames(
				ModalStyle.modalWrapper,
				wrapperClassname,
			)}
			aria-modal
			aria-hidden
			tabIndex={-1}
			role="dialog"
		>
			<div className={classnames(
				ModalStyle.modal,
				modalClassName,
			)}
			>
				<div className={ModalStyle.header}>
					{
						modalTitle
							?	(
								<h3>
									{modalTitle}
								</h3>
							)
							: null
					}
					{
						hasCloseIcon
							? (
								<button
									type="button"
									className={ModalStyle.closeBtn}
									data-dismiss="modal"
									aria-label="Close"
									onClick={hide}
								>
									<CloseIcon htmlColor="#ffffff" />
								</button>
							)
							: null
					}
				</div>
				{children}
			</div>
		</div>
	</>, selector,
) : null)

Modal.defaultProps = {
	hasCloseIcon: true,
	modalClassName: null,
	modalTitle: null,
	overlayClassName: ModalStyle.modalOverlay,
	overlayColor: null,
	selector: document.body,
	wrapperClassname: null,
}

Modal.propTypes = {
	hasCloseIcon: propTypes.bool.isRequired,
	modalClassName: propTypes.string,
	modalTitle: propTypes.string,
	overlayClassName: propTypes.string,
	overlayColor: propTypes.string,
	selector: propTypes.string,
	wrapperClassname: propTypes.string,
}

export default Modal
