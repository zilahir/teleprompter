/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'react-redux'
import useSocket from 'use-socket.io-client'

import TextScroller from '../TextScroller'
import Loader from '../Loader'
import Header from './Header'

/**
* @author zilahir
* @function Player
* */

const Player = () => {
	const [text, setText] = useState('')
	// const [isPlaying, togglePlaying] = useState(false)
	const [isLoading, toggleIsLoading] = useState(false)
	const store = useStore()
	const [socket] = useSocket(process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NODE_ENV === 'production')
	const { slug } = useParams()
	useEffect(() => {
		// socket.connect()
		setText(store.getState().userPrompters.prompterObject.text)
		socket.on('isPlaying', ({ prompterId, isPlaying }) => {
			// togglePlaying(playing)
			console.debug(`prompterId: ${prompterId}, isPlaying: ${isPlaying}`)
		})
	}, [store, socket])

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
								scrollSpeed={store.getState().text.scrollSpeed}
							/>
						)
						: <Loader isLoading={isLoading} />
				}
			</div>
		</>
	)
}

export default Player
