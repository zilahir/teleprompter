import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import styled from 'styled-components'

import styles from './Instruction.module.scss'
import { hideInstruction } from '../../../store/actions/misc'

/**
* @author zilahir
* @function Instruction
* */

const InstructionContainer = styled.p`
	max-width: ${props => props.maxWidth}px;
`

const Instruction = props => {
	const { text, hasPadding, maxWidth, type, noHide } = props
	const dispatch = useDispatch()
	function hideThisInfoBox() {
		dispatch(hideInstruction(type, false))
	}
	return (
		<div
			className={classnames(
				styles.instructionContainer,
				!hasPadding ? styles.noPadding : null,
			)}
		>
			<InstructionContainer
				maxWidth={maxWidth}
			>
				{text}
				{
					!noHide
						? (
							<span
								onClick={() => hideThisInfoBox()}
								role="button"
								onKeyDown={null}
								tabIndex={-1}
							>
								Hide this guide
							</span>
						)
						: null
				}
			</InstructionContainer>
		</div>
	)
}

Instruction.defaultProps = {
	hasPadding: true,
	maxWidth: 'unset',
	noHide: false,
}

Instruction.propTypes = {
	hasPadding: PropTypes.bool,
	maxWidth: PropTypes.number,
	noHide: PropTypes.bool,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}

export default Instruction
