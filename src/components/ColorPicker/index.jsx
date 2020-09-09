/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { CirclePicker } from 'react-color'
import PropTypes from 'prop-types'

import styles from './ColorPicker.module.scss'

/**
 * @author zilahir
 * @function ColorPicker
 * */

const ColorPicker = ({
	isVisible,
	onClose,
	onChangeColor,
}) => (
	<>
		{
			isVisible
				? ReactDOM.createPortal(
					<div
						role="button"
						onKeyDown={null}
						tabIndex={-1}
						onClick={onClose}
						className={styles.overlay}
					/>, document.body,
				)
				: null
		}
		<div className={classnames(
			styles.colorPickerContainer,
			isVisible ? styles.visible : styles.hidden,
		)}
		>
			<CirclePicker
				onChange={color => onChangeColor(color.hex)}
			/>
		</div>
	</>
)

ColorPicker.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onChangeColor: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	// segmentIndex: PropTypes.number.isRequired,
}

export default ColorPicker
