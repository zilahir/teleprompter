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
			<Logo
				className={styles.mobileLogo}
			/>
			<div className={styles.innerContainer}>
				<Input
					labelText="Enter your session id"
					getBackValue={val => setPrompterSlug(val)}
					inputClassName={styles.input}
				/>
				<Button
					labelText="GO"
					onClick={() => history.push(`/remote/${prompterSlug}`)}
					buttonClass={styles.goBtn}
				/>
			</div>
		</div>
	)
}

export default Mobile
