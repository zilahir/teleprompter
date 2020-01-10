import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'rc-slider'
import { useDispatch } from 'react-redux'

import { SET_FONT_SIZE } from '../../../store/actions/actionTypes'
import { setFontSize } from '../../../store/actions/text'
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
	const { labelText, sliderName, initialValue, step, maxValue } = props
	const [value, setValue] = useState(initialValue)
	const dispatch = useDispatch()
	function handleValeChange(v) {
		console.debug('fontSize', v)
		if (sliderName === SET_FONT_SIZE) {
			dispatch(setFontSize(v))
		}
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
					max={maxValue}
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
	maxValue: 100,
	step: 1,
}

SliderAlt.propTypes = {
	initialValue: PropTypes.number,
	labelText: PropTypes.string.isRequired,
	maxValue: PropTypes.number,
	sliderName: PropTypes.string.isRequired,
	step: PropTypes.number,
}

export default SliderAlt
