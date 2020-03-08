import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'

import styles from './Loader.module.scss'
import { Colors } from '../../utils/consts'

/**
* @author zilahir
* @function Loader
* */

const Loader = ({ isLoading, color }) => (
	<>
		isLoading
		{
			isLoading
				? (
					<div className={styles.loadingOverlay}>
						<ReactLoading
							type="sping"
							color={color}
						/>
					</div>
				)
				: null
		}
	</>
)

Loader.defaultProps = {
	color: Colors.purple,
	isLoading: false,
}

Loader.propTypes = {
	color: PropTypes.string,
	isLoading: PropTypes.bool,
}

export default Loader
