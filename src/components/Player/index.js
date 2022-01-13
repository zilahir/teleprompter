/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactGA from 'react-ga'
import { useSelector } from 'react-redux'
import { useSocket } from '@zilahir/use-socket.io-client'

import TextScroller from '../TextScroller'
import Loader from '../Loader'
import Header from './Header'
import { PLAYER } from '../../utils/consts'
import { getPrompterBySlug } from '../../store/actions/prompter'

/**
* @author zilahir
* @function Player
* */

const Player = () => {
	ReactGA.pageview(`/${PLAYER}`)
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5000' : process.env.REACT_APP_BACKEND_V2)
	const [isLoading, toggleIsLoading] = useState(false)
	const [isUpdateBtnVisible, toggleUpdateBtn] = useState(false)
	const [prompterObject, setPrompterObject] = useState(undefined)
	const [segments, setSegments] = useState([])
	const [updatedPrompterObject, updatePrompterObject] = useState({})
	const { slug } = useParams()
	const { text } = useSelector(store => store)

	useEffect(() => {
		toggleIsLoading(true)
		getPrompterBySlug(slug).then(result => {
			if (result.isSuccess) {
				setPrompterObject(result.prompter.meta)
				setSegments(result.prompter.segments)
			}
			toggleIsLoading(false)
		})
	}, [])

	if (socket) {
		socket.on('updatePrompter', updatedPrompter => {
			if (updatedPrompter.slug === slug) {
				toggleUpdateBtn(true)
				updatePrompterObject(updatedPrompter)
			}
		})
	}

	function handleUpdate() {
		console.log('updatedPrompterObject', updatedPrompterObject)
		setPrompterObject(updatedPrompterObject.meta)
		setSegments(updatedPrompterObject.segments)
		toggleUpdateBtn(false)
	}

	return (
		<>
			<Header
				isUpdateBtnVisible={isUpdateBtnVisible}
				updateBtnClick={() => handleUpdate()}
			/>
			<div>
				{
					!isLoading && prompterObject
						? (
							<TextScroller
								segments={segments}
								slug={slug}
								prompterObject={prompterObject}
								scrollSpeed={(10 - text.scrollSpeed) * 10}
							/>
						)
						: <Loader isLoading={isLoading} />
				}
			</div>
		</>
	)
}

export default Player
