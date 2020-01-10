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
	margin-bottom: 40px;
`

const SliderAlt = props => {
	const { labelText, sliderName, initialValue, step } = props
	const [value, setValue] = useState(initialValue)

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
					step={step}
				/>
				<p className="sliderValue">
					{value}
				</p>
			</div>
		</SliderContanier>
	)
}

SliderAlt.defaultProps = {
	initialValue: 10,
	step: 1,
}

SliderAlt.propTypes = {
	initialValue: PropTypes.number,
	labelText: PropTypes.string.isRequired,
	sliderName: PropTypes.string.isRequired,
	step: PropTypes.number,
}

export default SliderAlt
