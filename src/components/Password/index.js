/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Row, Container, Col } from 'react-grid-system'
import { useHistory, useParams } from 'react-router-dom'

import styles from './Password.module.scss'
import Button from '../common/Button'
import Input from '../common/Input'
import Logo from '../common/Logo'
import { getPasswordResetObject } from '../../store/actions/user'

/**
* @author zilahir
* @function Password
* */

const Password = () => {
	const history = useHistory()
	const [newPassword, setNewPassword] = useState(null)
	const [confirmNewPassword, setConfirmNewpassword] = useState(null)
	const { slug } = useParams()

	function updatePassword() {
		const updatePasswordObject = {
			newPassword,
			confirmNewPassword,
		}
	}

	useEffect(() => {
		console.debug('render', slug)
		const passwordRecoveryRequest = getPasswordResetObject(slug)
		passwordRecoveryRequest.then(res => {
			console.debug('res', res)
		})
	}, [])
	return (
		<div className={styles.passwordRecoveryWrapper}>
			<Container
				fluid
			>
				<Row>
					<Col className={styles.dark} lg={3} />
					<Col className={styles.middle} lg={6}>
						<div>
							<div className={styles.titleContainer}>
								<Logo className={styles.logo} />
								<h1>
									Password reset
								</h1>
							</div>
							<div className={styles.inputContainer}>
								<Input
									placeholder="New password"
									getBackValue={v => setNewPassword(v)}
									labelText="New password"
								/>
								<Input
									placeholder="Confirm new password"
									getBackValue={v => setConfirmNewpassword(v)}
									labelText="Confirm new password"
								/>
							</div>
							<Button
								labelText="update"
								onClick={() => updatePassword()}
								buttonClass={styles.buttonContainer}
							/>
						</div>
					</Col>
					<Col className={styles.dark} lg={3} />
				</Row>
			</Container>
		</div>
	)
}

export default Password
