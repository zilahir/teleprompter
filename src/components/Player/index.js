/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactGA from 'react-ga'
import { useStore } from 'react-redux'
import { useSocket } from '@zilahir/use-socket.io-client'

import TextScroller from '../TextScroller'
import Loader from '../Loader'
import Header from './Header'
import { PLAYER } from '../../utils/consts'

/**
* @author zilahir
* @function Player
* */

const Player = () => {
	ReactGA.pageview(`/${PLAYER}`)
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND)
	const [text, setText] = useState('')
	// eslint-disable-next-line no-unused-vars
	const [isLoading, toggleIsLoading] = useState(false)
	const [isUpdateBtnVisible, toggleUpdateBtn] = useState(false)
	const [promoterObject, setPrompterObject] = useState({})
	const [updatedPrompterObject, updatePrompterObject] = useState({})
	const store = useStore()
	const { slug } = useParams()
	useEffect(() => {
		setText(store.getState().userPrompters.prompterObject.text)
		setPrompterObject(store.getState().userPrompters.prompterObject)
	}, [store])

	if (socket) {
		socket.on('updatePrompter', updatedPrompter => {
			console.debug('received value', updatedPrompter)
			if (updatedPrompter.slug === slug) {
				toggleUpdateBtn(true)
				updatePrompterObject(updatedPrompter)
			}
		})
	}

	function handleUpdate() {
		setPrompterObject(updatedPrompterObject.meta)
		toggleUpdateBtn(false)
		if (updatedPrompterObject.text !== text) {
			setText(updatedPrompterObject.text)
		}
		console.debug('updatedPrompterObject', updatedPrompterObject)
	}

	return (
		<>
			<Header
				isUpdateBtnVisible={isUpdateBtnVisible}
				updateBtnClick={() => handleUpdate()}
			/>
			<div>
				{
					!isLoading
						? (
							<TextScroller
								text={text}
								slug={slug}
								prompterObject={promoterObject}
								scrollSpeed={(10 - store.getState().text.scrollSpeed) * 10}
							/>
						)
						: <Loader isLoading={isLoading} />
				}
			</div>
		</>
	)
}

export default Player
