import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Logo from '../common/Logo'
import styles from './Mobile.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'


/**
* @author zilahir
* @function Mobile
* */

const Mobile = () => {
	const history = useHistory()
	const [prompterSlug, setPrompterSlug] = useState(null)
	return (
		<div className={styles.mobileContainer}>
			<Logo />
			<div className={styles.innerContainer}>
				<Input
					labelText="Enter your session id"
					getBackValue={val => setPrompterSlug(val.target.value)}
				/>
			</div>
			<Button
				labelText="GO"
				onClick={() => history.push(`/controller/${prompterSlug}`)}
			/>
		</div>
	)
}

export default Mobile
