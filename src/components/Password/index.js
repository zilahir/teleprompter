/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Row, Container, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'

import styles from './Password.module.scss'
import Button from '../common/Button'
import Input from '../common/Input'

/**
* @author zilahir
* @function Password
* */

const Password = () => {
	const history = useHistory()
	const [newPassword, setNewPassword] = useState(null)
	const [confirmNewPassword, setConfirmNewpassword] = useState(null)

	function updatePassword() {
		const updatePasswordObject = {
			newPassword,
			confirmNewPassword,
		}
	}
	return (
		<div className={styles.passwordRecoveryWrapper}>
			<Container
				fluid
			>
				<Row>
					<Col className={styles.dark} lg={3} />
					<Col className={styles.middle} lg={6}>
						<div>
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
