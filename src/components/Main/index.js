import React, { useEffect, useState } from 'react'
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
	const [isLoading, toggleLoading] = useState(false)
	useEffect(() => {
		Promise.all([
			dispatch(setPrompterSlug(uuidv4())),
		]).then(() => {
			toggleLoading(true)
		})
	}, [isLoading])
	return (
		<div className={styles.mainContainer}>
			{
				isLoading
					? (
						<Container
							fluid
						>
							<Row>
								<EditorSidebar />
								<Preview />
								<ActionSidebar />
							</Row>
						</Container>
					)
					: null
			}
		</div>
	)
}

export default Main
