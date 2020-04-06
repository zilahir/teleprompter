import React from 'react'
import { useStore } from 'react-redux'
import Icon from 'react-icons-kit'
import { refresh } from 'react-icons-kit/fa/refresh'
import PropTypes from 'prop-types'

import styles from '../Player.module.scss'
import Button from '../../common/Button'

/**
* @author zilahir
* @function Header
* */

const Header = props => {
	const store = useStore()
	const { prompterSlug } = store.getState().userPrompters
	const { isUpdateBtnVisible, updateBtnClick } = props
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
				<div className={styles.updateBtnContainer}>
					{
						isUpdateBtnVisible
							? (
								<Button
									labelText="update"
									buttonClass={styles.updateBtn}
									icon={
										<Icon icon={refresh} />
									}
									onClick={updateBtnClick}
								/>
							)
							: null
					}
				</div>
				<div>
					<p>
						Your session ID is <span>{prompterSlug}</span>
					</p>
				</div>
				<div>
					<p>
						Pres F6 to toggle fullscreen
					</p>
				</div>
			</div>
		</header>
	)
}

Header.defaultProps = {
	isUpdateBtnVisible: false,
}

Header.propTypes = {
	isUpdateBtnVisible: PropTypes.bool,
	updateBtnClick: PropTypes.func.isRequired,
}

export default Header
