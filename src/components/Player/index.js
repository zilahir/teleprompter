/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
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
	const [isLoading, toggleIsLoading] = useState(false)
	const store = useStore()
	const { slug } = useParams()
	useEffect(() => {
		setText(store.getState().userPrompters.prompterObject.text)
	}, [store])

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
								scrollSpeed={store.getState().text.scrollSpeed * 2}
							/>
						)
						: <Loader isLoading={isLoading} />
				}
			</div>
		</>
	)
}

export default Player
