/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading'

import styles from './Loader.module.scss'
import { Colors, FULL_LOADER, INLINE_LOADER } from '../../utils/consts'

/**
* @author zilahir
* @function Loader
* */

const Loader = ({ isLoading, color, type, width, height }) => (
	<>
		{
			isLoading && type === FULL_LOADER
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
				: isLoading && type === INLINE_LOADER
					? (
						<div className={styles.inlineLoader}>
							<ReactLoading
								type="spin"
								color={color}
								width={width}
								height={height}
							/>
						</div>
					)
					: null
		}
	</>
)

Loader.defaultProps = {
	color: Colors.purple,
	height: 10,
	isLoading: false,
	type: FULL_LOADER,
	width: 10,
}

Loader.propTypes = {
	color: PropTypes.string,
	height: PropTypes.number,
	isLoading: PropTypes.bool,
	type: PropTypes.string,
	width: PropTypes.number,
}

export default Loader
