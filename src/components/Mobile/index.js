import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import KeyboardEventHandler from 'react-keyboard-event-handler'

import Logo from '../common/Logo'
import styles from './Mobile.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'
import { ENTER } from '../../utils/consts'


/**
* @author zilahir
* @function Mobile
* */

const Mobile = () => {
	const history = useHistory()
	const [prompterSlug, setPrompterSlug] = useState(null)

	function handleEnter() {
		if (prompterSlug) {
			history.push(`/remote/${prompterSlug}`)
		}
	}
	return (
		<div className={styles.mobileContainer}>
			<Logo />
			<div className={styles.innerContainer}>
				<Input
					labelText="Enter your session id"
					getBackValue={val => setPrompterSlug(val)}
				/>
			</div>
			<Button
				labelText="GO"
				onClick={() => history.push(`/remote/${prompterSlug}`)}
			/>
			<KeyboardEventHandler
				handleKeys={[ENTER]}
				onKeyEvent={() => handleEnter()}
			/>
		</div>
	)
}

export default Mobile
