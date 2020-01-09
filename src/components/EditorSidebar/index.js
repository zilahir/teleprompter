import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

import SliderAlt from '../common/SliderAlt'
import Selector from '../common/Selector'
import { scrollWidthSettngs } from '../../utils/consts'
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
						initialValue={25}
					/>
					<SliderAlt
						labelText="Letter spacing"
						sliderName="letterSpacing"
						initialValue={1.5}
						step={0.1}
					/>
					<SliderAlt
						labelText="Line height"
						sliderName="lineHeight"
						initialValue={1.5}
						step={0.1}
					/>
					<Selector items={scrollWidthSettngs} />
					<SliderAlt
						labelText="Scroll speed"
						sliderName="scrollSpeed"
						initialValue={5}
						step={1}
					/>
				</div>
			</Col>
		</>
	)
}

export default EditorSidebar
