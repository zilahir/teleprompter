import React, { useState, useRef, useEffect } from 'react'
import { useStore } from 'react-redux'
import useSocket from 'use-socket.io-client'

import TextScroller from '../TextScroller'
import styles from './Player.module.scss'

/**
* @author zilahir
* @function Player
* */

const Player = () => {
	const [text, setText] = useState('')
	const [isPlaying, setIsPlaying] = useState(false)
	const store = useStore()
	const [socket] = useSocket('https://radiant-plains-03261.herokuapp.com/')

	function handleStart() {

	}
	function handleStop() {

	}
	useEffect(() => {
		// socket.connect()
		setText(store.getState().text.text)
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
		<div className={styles.app}>
			<TextScroller
				text={text}
			/>
		</div>
	)
}

export default Player
