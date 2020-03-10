import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Row, Container } from 'react-grid-system'
import { useDispatch } from 'react-redux'

import EditorSidebar from '../EditorSidebar'
import ActionSidebar from '../ActionSidebar'
import Preview from '../Preview'
import styles from './Main.module.scss'
import { setPrompterSlug } from '../../store/actions/prompter'

/**
* @author zilahir
* @function Main
* */

const Main = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		Promise.all([
			dispatch(setPrompterSlug(uuidv4())),
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
