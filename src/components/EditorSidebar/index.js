import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import SliderAlt from '../common/SliderAlt'
import styles from './EditorSidebar.module.scss'

/**
* @author zilahir
* @function EditorSidebar
* */

const EditorSidebar = () => {
	const store = useStore()
	return (
		<>
			<Col
				lg={3}
				className={styles.editorSidebarContainer}
			>
				<div className={styles.innerContainer}>
					<SliderAlt
						labelText="Text size"
						sliderName="fontSize"
					/>
					<SliderAlt
						labelText="Letter spacing"
						sliderName="letterSpacing"
					/>
					<SliderAlt
						labelText="Line height"
						sliderName="lineHeight"
					/>
				</div>
			</Col>
		</>
	)
}

export default EditorSidebar
