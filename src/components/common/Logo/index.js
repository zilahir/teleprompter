import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { COLOR_DARK } from '../../../utils/consts'
/**
* @author
* @function Logo
* */

const LogoImage = styled.img`
	max-width: ${props => props.size};
`

const Logo = props => {
	const { size, type } = props
	return (
		<div>
			<LogoImage
				src={Logo}
				size={size}
			/>
		</div>
	)
}

Logo.defaultProps = {
	size: 200,
	type: COLOR_DARK,
}

Logo.propTypes = {
	size: PropTypes.number,
	type: PropTypes.string,
}

export default Logo
