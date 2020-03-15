import React, { useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Row, Container } from 'react-grid-system'

import EditorSidebar from '../EditorSidebar'
import ActionSidebar from '../ActionSidebar'
import Preview from '../Preview'
import styles from './Main.module.scss'
import { setPrompterSlug, getAllUserPrompter, clearPrompterObject } from '../../store/actions/prompter'
import { clearText } from '../../store/actions/text'

/**
* @author zilahir
* @function Main
* */

const Main = () => {
	const dispatch = useDispatch()
	const store = useStore()
	useEffect(() => {
		Promise.all([
			dispatch(clearText()),
			dispatch(clearPrompterObject()),
			dispatch(setPrompterSlug(uuidv4())),
		]).then(() => {
			if (store.getState().user.loggedIn) {
				dispatch(getAllUserPrompter('5e63f4ba19a0555a4fbbe5da'))
			}
		})
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
