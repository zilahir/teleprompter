/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useSocket } from '@zilahir/use-socket.io-client'
import { useParams } from 'react-router-dom'
import { useStore } from 'react-redux'

import TextScroller from '../TextScroller'
import Loader from '../Loader'
import Header from './Header'

/**
* @author zilahir
* @function Player
* */

const Player = () => {
	const [text, setText] = useState('')
	// eslint-disable-next-line no-unused-vars
	const [isLoading, toggleIsLoading] = useState(false)
	const store = useStore()
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND)
	const { slug } = useParams()
	useEffect(() => {
		setText(store.getState().userPrompters.prompterObject.text)
	}, [store])

	if (socket) {
		socket.on('updatePrompter', ({ updatedPrompter }) => {
			if (updatedPrompter.slug === slug) {
				console.debug('prompter is updaated', updatedPrompter)
				// TODO: dispatch here
			}
		})
	}
	return (
		<>
			<Header />
			<div>
				{
					!isLoading
						? (
							<TextScroller
								text={text}
								slug={slug}
								prompterObject={store.getState().userPrompters.prompterObject}
								scrollSpeed={(10 - store.getState().text.scrollSpeed) * 2}
							/>
						)
						: <Loader isLoading={isLoading} />
				}
			</div>
		</>
	)
}

export default Player
