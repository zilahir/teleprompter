import React, { useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Row, Container } from 'react-grid-system'
import shortid from 'shortid'
import random from 'random'

import EditorSidebar from '../EditorSidebar'
import ActionSidebar from '../ActionSidebar'
import Preview from '../Preview'
import styles from './Main.module.scss'
import { setPrompterSlug, getAllUserPrompter, clearPrompterObject } from '../../store/actions/prompter'
import { toggleMirror } from '../../store/actions/text'
import { toggleUpdateBtn } from '../../store/actions/misc'
import Footer from '../Footer'
import ActionHeader from '../ActionHeader'
import { setSegments } from '../../store/actions/segments'
import { colors, SEGMENT } from '../../utils/consts'

/**
* @author zilahir
* @function Main
* */

const Main = () => {
	const dispatch = useDispatch()
	const store = useStore()
	useEffect(() => {
		Promise.all([
			dispatch(setSegments([{
				segmentTitle: 'Add segment name',
				segmentText: '',
				segmentColor: colors[random.int(0, colors.length - 1)],
				id: shortid.generate(),
				type: SEGMENT.toLowerCase(),
			}])),
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
				<ActionHeader />
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
