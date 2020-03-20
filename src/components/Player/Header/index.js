import React from 'react'
import { useStore } from 'react-redux'

import styles from '../Player.module.scss'

/**
* @author zilahir
* @function Header
* */

const Header = () => {
	const store = useStore()
	const { prompterSlug } = store.getState().userPrompters
	return (
		<header className={styles.playerHeader}>
			<div className={styles.innerContainer}>
				<div>
					<p>
						Keyboard
					</p>
					<p>
						Keyboard Space to play/pause, up/down and pgup/pgdown to navigate,
						left/right to adjust speed
					</p>
				</div>
				<div>
					<p>
						Mouse
					</p>
					<p>
						Mouse Left click to play/pause, scroll to navigate
					</p>
				</div>
				<div>
					<p>
						Your session ID is <span>{prompterSlug}</span>
					</p>
				</div>
				<div>
					<p>
						Pres F11 to toggle fullscreen
					</p>
				</div>
			</div>
		</header>
	)
}

export default Header
