import React, { useEffect } from 'react'
import { Row, Container } from 'react-grid-system'
import { useDispatch } from 'react-redux'

import EditorSidebar from '../EditorSidebar'
import ActionSidebar from '../ActionSidebar'
import Preview from '../Preview'
import { setSegments } from '../../store/actions/segments'
import segmentApi from '../../utils/fakeApi/segments'
import styles from './Main.module.scss'

/**
* @author zilahir
* @function Main
* */

const Main = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		Promise.all([
			dispatch(setSegments(segmentApi.getAllSegments())),
		])
	}, [])
	return (
		<div className={styles.mainContainer}>
			<Container
				fluid
			>
				<Row>
					<EditorSidebar />
					<Preview />
					<ActionSidebar />
				</Row>
			</Container>
		</div>
	)
}

export default Main
