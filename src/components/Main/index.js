import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import ActionHeader from '../ActionHeader'
import { setSegments } from '../../store/actions/segments'
import { colors, SEGMENT } from '../../utils/consts'
import RootContext from './rootContext'

/**
* @author zilahir
* @function Main
* */

const Main = () => {
	const dispatch = useDispatch()
	const [textPreview, setTextPreview] = useState('')
	const { user } = useSelector(state => state)
	useEffect(() => {
		Promise.all([
			dispatch(setSegments([{
				segmentTitle: '',
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
			if (user.loggedIn) {
				dispatch(getAllUserPrompter(user.user.userId))
			}
		})
	}, [])
	return (
		<>
			<div className={styles.mainContainer}>
				<ActionHeader />
				<Container
					fluid
					id="prompter-root"
				>
					<Row
						className={styles.heightFixer}
					>
						<RootContext.Provider
							value={{
								textPreview,
								setTextPreview,
							}}
						>
							<EditorSidebar />
							<Preview />
							<ActionSidebar />
						</RootContext.Provider>
					</Row>
				</Container>
			</div>
		</>
	)
}

export default Main
