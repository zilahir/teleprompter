/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import styled from 'styled-components'

import styles from './Instruction.module.scss'
import { hideInstruction } from '../../../store/actions/misc'
import { INFOBOX_SIDEBAR } from '../../../utils/consts'

/**
* @author zilahir
* @function Instruction
* */

const InstructionContainer = styled.p`
	max-width: ${props => props.maxWidth}px;
`

const Instruction = props => {
	const { text, hasPadding, maxWidth, type } = props
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
				<span
					onClick={() => hideThisInfoBox()}
					role="button"
					onKeyDown={null}
					tabIndex={-1}
				>
					Hide this guide
				</span>
			</InstructionContainer>
		</div>
	)
}

Instruction.defaultProps = {
	hasPadding: true,
	maxWidth: 'unset',
}

Instruction.propTypes = {
	hasPadding: PropTypes.bool,
	maxWidth: PropTypes.number,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
}

export default Instruction
