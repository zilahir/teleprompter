import React from 'react'

import Logo from '../common/Logo'
import styles from './Mobile.module.scss'
import Input from '../common/Input'
import Button from '../common/Button'


/**
* @author zilahir
* @function Mobile
* */

const Mobile = () => {
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
				onClick={() => null}
			/>
		</div>
	)
}

export default Mobile
