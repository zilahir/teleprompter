import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import { useDispatch } from 'react-redux'
import 'rc-slider/assets/index.css'

import { SET_FONT_SIZE, SET_LETTER_SPACING, SET_LINE_HEIGHT, SET_SCROLL_SPEED } from '../../../store/actions/actionTypes'
import { setFontSize, setLetterSpacing, setLineHeight, setScrollSpeed } from '../../../store/actions/text'
import './Slider.scss'

/**
* @author zilahir
* @function SliderAlt
* */

const SliderAlt = props => {
	const { labelText, sliderName, initialValue, step, maxValue, minValue } = props

	const dispatch = useDispatch()
	function handleValeChange(v) {
		if (sliderName === SET_FONT_SIZE) {
			dispatch(setFontSize(v))
		} else if (sliderName === SET_LETTER_SPACING) {
			dispatch(setLetterSpacing(v))
		} else if (sliderName === SET_LINE_HEIGHT) {
			dispatch(setLineHeight(v))
		} else if (sliderName === SET_SCROLL_SPEED) {
			dispatch(setScrollSpeed(v))
		}
	}

	return (
		<div
			className="sliderContainer"
		>
			<div className="top">
				<p className="labelText">
					{labelText}
				</p>
				<p className="sliderValue">
					{initialValue}
				</p>
			</div>
			<div className="sliderInner">
				<Slider
					className="slider"
					value={initialValue}
					onChange={val => handleValeChange(val)}
					name={sliderName}
					step={step}
					max={maxValue}
					min={minValue}
				/>
			</div>
		</div>
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
