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
	const [isPlaying, setIsPlaying] = useState(false)
	const store = useStore()
	const [socket] = useSocket('https://radiant-plains-03261.herokuapp.com/')
	const { slug } = useParams()
	function handleStart() {

	}
	function handleStop() {

	}
	useEffect(() => {
		// socket.connect()
		setText(store.getState().text.text)
		console.debug('slug', slug)
		socket.on('isPlaying', playing => {
			setIsPlaying(playing)
			if (playing) {
				handleStart()
			} else {
				handleStop()
			}
		})
	}, [store, isPlaying, socket])

	return (
		<div>
			<TextScroller
				text={text}
			/>
		</div>
	)
}

export default Player
