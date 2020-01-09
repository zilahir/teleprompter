import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import './Slider.scss'

/**
* @author zilahir
* @function SliderAlt
* */

const SliderContanier = styled.div`
	width: 185px;
`

const SliderAlt = props => {
	const { labelText, sliderName } = props
	const [value, setValue] = useState(26)

	function handleValeChange(v) {
		// TODO: dispatch setFontSize action here
		setValue(v)
	}
	return (
		<SliderContanier>
			<p className="labelText">
				{labelText}
			</p>
			<div className="sliderInner">
				<Slider
					className="slider"
					value={value}
					onChange={val => handleValeChange(val)}
					name={sliderName}
				/>
				<p className="sliderValue">
					{value}
				</p>
			</div>
		</SliderContanier>
	)
}

SliderAlt.propTypes = {
	labelText: PropTypes.string.isRequired,
	sliderName: PropTypes.string.isRequired,
}

export default SliderAlt
