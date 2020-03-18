import React from 'react'
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
	return (
		<div className={styles.mobileContainer}>
			<Logo />
			<div className={styles.innerContainer}>
				<Input
					labelText="Enter your session id"
					getBackValue={val => console.debug('val', val)}
				/>
			</div>
			<Button
				labelText="GO"
				onClick={() => history.push('/controller')}
			/>
		</div>
	)
}

export default Mobile
