import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import teleprompterLogo from '../../../assets/prompterme-logo-light.svg'
import { COLOR_LIGHT } from '../../../utils/consts'
import styles from './Logo.module.scss'

/**
* @author
* @function Logo
* */

const LogoImage = styled.img`
	max-width: ${props => props.size}px;
`

const Logo = props => {
	const { size, type, className } = props
	return (
		<div className={classnames(
			styles.logoContainer,
			className,
		)}
		>
			<LogoImage
				src={teleprompterLogo}
				size={size}
				type={type}
			/>
		</div>
	)
}

Logo.defaultProps = {
	className: null,
	size: 200,
	type: COLOR_LIGHT,
}

Logo.propTypes = {
	className: PropTypes.string,
	size: PropTypes.number,
	type: PropTypes.string,
}

export default Logo
