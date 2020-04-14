import React, { useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Row, Container } from 'react-grid-system'

import EditorSidebar from '../EditorSidebar'
import ActionSidebar from '../ActionSidebar'
import Preview from '../Preview'
import styles from './Main.module.scss'
import { setPrompterSlug, getAllUserPrompter, clearPrompterObject } from '../../store/actions/prompter'
import { clearText, toggleMirror } from '../../store/actions/text'
import { toggleUpdateBtn } from '../../store/actions/misc'
import Footer from '../Footer'

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
			dispatch(toggleMirror(false)),
			dispatch(clearPrompterObject()),
			dispatch(toggleUpdateBtn(false)),
			dispatch(setPrompterSlug(uuidv4().split('-')[0])),
		]).then(() => {
			if (store.getState().user.loggedIn) {
				dispatch(getAllUserPrompter(store.getState().user.user.userId))
			}
		})
	}, [])
	return (
		<>
			<div className={styles.mainContainer}>
				<Container
					fluid
				>
					<Row
						className={styles.heightFixer}
					>
						<EditorSidebar />
						<Preview />
						<ActionSidebar />
					</Row>
				</Container>
			</div>
			<Footer />
		</>
	)
}

export default Main
