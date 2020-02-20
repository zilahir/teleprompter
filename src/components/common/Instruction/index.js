import React from 'react'
import PropTypes from 'prop-types'

import styles from './Instruction.module.scss'

/**
* @author zilahir
* @function Instruction
* */

const Instruction = props => {
	const { text } = props
	return (
		<div className={styles.instructionContainer}>
			<p>
				{text}
			</p>
		</div>
	)
}

Instruction.propTypes = {
	text: PropTypes.string.isRequired,
}

export default Instruction
