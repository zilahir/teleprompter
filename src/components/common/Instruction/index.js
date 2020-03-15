import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from 'styled-components'

import styles from './Instruction.module.scss'

/**
* @author zilahir
* @function Instruction
* */

const InstructionContainer = styled.p`
	max-width: ${props => props.maxWidth}px;
`

const Instruction = props => {
	const { text, hasPadding, maxWidth } = props
	return (
		<div
			className={classnames(
				styles.instructionContainer,
				!hasPadding ? styles.noPadding : null,
			)}
			role="button"
			onKeyDown={null}
			onClick={() => alert("hello")}
			tabIndex={-1}
		>
			<InstructionContainer maxWidth={maxWidth}>
				{text}
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
}

export default Instruction
