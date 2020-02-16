import React from 'react'

import { LINK } from '../../utils/consts'
import Button from '../common/Button'
import styles from './ActionHeader.module.scss'

/**
* @author zilahir
* @function ActionHeader
* */

const ActionHeader = () => (
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
					onClick={() => null}
					type={LINK}
				/>
			</li>
		</ul>
	</div>
)

export default ActionHeader
