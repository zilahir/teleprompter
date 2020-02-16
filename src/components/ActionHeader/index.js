import React, { useState } from 'react'

import { LINK, LOGIN, REGISTER } from '../../utils/consts'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'

/**
* @author zilahir
* @function ActionHeader
* */

const ActionHeader = () => {
	const [showLogin, toggleLogin] = useState(false)
	const [showRegister, toggleRegister] = useState(false)
	return (
		<div className={styles.actionHeaderContainer}>
			<ul className={styles.actionList}>
				<li>
					<Button
						labelText="Sign Up"
						onClick={() => toggleRegister(!showRegister)}
						type={LINK}
					/>
				</li>
				<li>
					<Button
						labelText="Login"
						onClick={() => toggleLogin(!showLogin)}
						type={LINK}
					/>
				</li>
			</ul>
			<Login
				isVisible={showLogin}
				type={LOGIN}
			/>
			<Login
				isVisible={showRegister}
				type={REGISTER}
			/>
		</div>
	)
}

export default ActionHeader
