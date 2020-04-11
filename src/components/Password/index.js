/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Row, Container, Col } from 'react-grid-system'
import { useHistory, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { alertTriangle } from 'react-icons-kit/feather/alertTriangle'
import Icon from 'react-icons-kit'

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
	const [alertMessage, setAlertMessage] = useState({})
	const [isHidden, toggleHidden] = useState(true)
	const { slug } = useParams()
	const { token } = useParams()

	function handlePasswordUpdate() {
		const updatePasswordObject = {
			newPassword,
			confirmNewPassword,
		}
	}

	useEffect(() => {
		console.debug('render', slug, token)
		const passwordRecoveryRequest = getPasswordResetObject(slug)
		passwordRecoveryRequest.then(res => {
			if (res.isUsed || res.expiresAt > new Date().getMinutes()) {
				setAlertMessage({
					text: 'This password reset had expired',
					state: 'error',
				})
			} else {
				toggleHidden(false)
			}
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
								{
									isHidden
										? (
											<div
												className={classnames(
													styles.info,
													styles[alertMessage.state],
												)}
											>
												<Icon size="1.5em" icon={alertTriangle} />
												<p>
													{
														alertMessage.text
													}
												</p>
											</div>
										) : null
								}
							</div>
							{
								!isHidden
									? (
										<>
											<div className={styles.info}>
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
												onClick={() => handlePasswordUpdate()}
												buttonClass={styles.buttonContainer}
												disabled={
													!newPassword || (newPassword !== confirmNewPassword)
												}
											/>
										</>
									) : null
							}
						</div>
					</Col>
					<Col className={styles.dark} lg={3} />
				</Row>
			</Container>
		</div>
	)
}

export default Password
