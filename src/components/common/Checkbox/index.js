import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Colors } from '../../../utils/consts'

const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
`

const Icon = styled.svg`
	fill: none;
	stroke: white;
	stroke-width: 2px;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`

const StyledCheckbox = styled.div`
	display: inline-block;
	width: 16px;
	height: 16px;
	background: #2D2D2D;
	border: 2px solid #ffffff;
	border-radius: 3px;
	transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
		box-shadow: 0 0 0 3px pink;
	}

	${Icon} {
		visibility: ${props => (props.checked ? 'visible' : 'hidden')};
		stroke: ${Colors.purple};
		stroke-width: 4px;
	}
`

/**
* @author zilahir
* @function Checkbox
* */

const Checkbox = ({ className, checked, onChange }) => (
	<CheckboxContainer
		className={className}
		onClick={onChange}
	>
		<HiddenCheckbox
			checked={checked}
		/>
		<StyledCheckbox checked={checked}>
			<Icon viewBox="0 0 24 24">
				<polyline points="20 6 9 17 4 12" />
			</Icon>
		</StyledCheckbox>
	</CheckboxContainer>
)

Checkbox.propTypes = {
	checked: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default Checkbox
