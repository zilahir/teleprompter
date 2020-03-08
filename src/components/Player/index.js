import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from 'react-redux'
import useSocket from 'use-socket.io-client'

import TextScroller from '../TextScroller'

/**
* @author zilahir
* @function Player
* */

const Player = () => {
	const [text, setText] = useState('')
	const [isPlaying, togglePlaying] = useState(false)
	const store = useStore()
	const [socket] = useSocket('https://radiant-plains-03261.herokuapp.com/')
	const { slug } = useParams()
	useEffect(() => {
		// socket.connect()
		setText(store.getState().text.text)
		socket.on('isPlaying', playing => {
			togglePlaying(playing)
		})
	}, [store, isPlaying, socket])

	return (
		<div>
			<TextScroller
				text={text}
				slug={slug}
			/>
		</div>
	)
}

export default Player
