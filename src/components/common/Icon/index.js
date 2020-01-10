import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import styles from './Icon.module.scss'

/**
* @author zilahir
* @function icon
* */

const IconWrapper = styled.div`
	color: ${props => props.color};
`

const Icon = props => {
	const { icon, onClick, color } = props
	return (
		<IconWrapper
			color={color}
			onClick={onClick}
			className={styles.iconContainer}
		>
			{icon}
		</IconWrapper>
	)
}

Icon.defaultProps = {
	color: '#fff',
	onClick: null,
}

Icon.propTypes = {
	color: PropTypes.string,
	icon: PropTypes.node.isRequired,
	onClick: PropTypes.func,
}

export default Icon
