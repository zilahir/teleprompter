import React from 'react'
import PropTypes from 'prop-types'
import { Slider as SliderV0 } from 'material-ui'
import { darkBaseTheme, getMuiTheme, MuiThemeProvider } from 'material-ui/styles'

import styles from './Slider.module.scss'

const theme = getMuiTheme(darkBaseTheme)
const sliderStyle = { margin: 0 }

/**
* @author zilahir
* @function Slide
* */

const Slider = props => {
	const { min, max, value, onChange} = props
	return (
		<MuiThemeProvider muiTheme={theme}>
			<div className={styles.sliderContainer}>
				<SliderV0
					sliderStyle={sliderStyle}
					min={min}
					max={max}
					onChange={onChange}
					value={value}
				/>
			</div>
		</MuiThemeProvider>
	)
}

Slider.propTypes = {
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
}

export default Slider
