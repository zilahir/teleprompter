import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import { segmentColors } from '../../utils/consts'
import styles from './Preview.module.scss'

/**
* @author zilahir
* @function Preview
* */

const Preview = () => {
	const store = useStore()

	return (
		<>
			<Col lg={6}>
				<div className={styles.previewContainer}>

				</div>
			</Col>
		</>
	)
}

export default Preview
