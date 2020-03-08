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
		{
			isLoading
				? (
					<div className={styles.loadingOverlay}>
						<ReactLoading
							type="spin"
							color={color}
							height={30}
							width={30}
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
