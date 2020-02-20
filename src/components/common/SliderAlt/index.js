import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'rc-slider'
import { useDispatch } from 'react-redux'

import { SET_FONT_SIZE, SET_LETTER_SPACING, SET_LINE_HEIGHT } from '../../../store/actions/actionTypes'
import { setFontSize, setLetterSpacing, setLineHeight } from '../../../store/actions/text'
import 'rc-slider/assets/index.css'

import './Slider.scss'

/**
* @author zilahir
* @function SliderAlt
* */

const SliderContanier = styled.div`
	width: 185px;
	margin-bottom: 20px;
`

const SliderAlt = props => {
	const { labelText, sliderName, initialValue, step, maxValue, minValue } = props
	const [value, setValue] = useState(initialValue)
	const dispatch = useDispatch()
	function handleValeChange(v) {
		if (sliderName === SET_FONT_SIZE) {
			dispatch(setFontSize(v))
		} else if (sliderName === SET_LETTER_SPACING) {
			dispatch(setLetterSpacing(v))
		} else if (sliderName === SET_LINE_HEIGHT) {
			dispatch(setLineHeight(v))
		}
		setValue(v)
	}
	return (
		<SliderContanier>
			<div className="top">
				<p className="labelText">
					{labelText}
				</p>
				<p className="sliderValue">
					{value}
				</p>
			</div>
			<div className="sliderInner">
				<Slider
					className="slider"
					value={value}
					onChange={val => handleValeChange(val)}
					name={sliderName}
					step={step}
					max={maxValue}
					min={minValue}
				/>
			</div>
		</SliderContanier>
	)
}

SliderAlt.defaultProps = {
	initialValue: 10,
	maxValue: 100,
	minValue: 1,
	step: 1,
}

SliderAlt.propTypes = {
	initialValue: PropTypes.number,
	labelText: PropTypes.string.isRequired,
	maxValue: PropTypes.number,
	minValue: PropTypes.number,
	sliderName: PropTypes.string.isRequired,
	step: PropTypes.number,
}

export default SliderAlt
