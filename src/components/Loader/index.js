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

const Loader = ({ isLoading, color, type }) => (
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
								width={10}
								height={10}
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
	type: FULL_LOADER,
}

Loader.propTypes = {
	color: PropTypes.string,
	isLoading: PropTypes.bool,
	type: PropTypes.string,
}

export default Loader
