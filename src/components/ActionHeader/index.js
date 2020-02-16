import React, { useState } from 'react'

import { LINK, LOGIN } from '../../utils/consts'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'
import Login from '../Login'

/**
* @author zilahir
* @function ActionHeader
* */

const ActionHeader = () => {
	const [showLogin, toggleLogin] = useState(false)
	return (
		<div className={styles.actionHeaderContainer}>
			<ul className={styles.actionList}>
				<li>
					<Button
						labelText="Sign Up"
						onClick={() => null}
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
		</div>
	)
}

export default ActionHeader
