import axios from 'axios'

import { AUTH_USER, REMOVE_USER } from './actionTypes'
import { apiEndpoints } from '../../utils/apiEndpoints'

const headers = {
	'Content-Type': 'application/json',
}

export const setUser = user => dispatch => new Promise(resolve => {
	dispatch({
		type: AUTH_USER,
		payload: {
			user,
		},
	})
	resolve(user)
})

export const removeUser = () => dispatch => new Promise(resolve => {
	dispatch({
		type: REMOVE_USER,
		payload: {},
	})
	resolve(true)
})

export const authUser = user => dispatch => new Promise(resolve => {
	const authObject = {
		email: `${user.email}`,
		password: `${user.password}`,
	}
	axios.post(apiEndpoints.authUser, JSON.stringify(authObject), {
		headers,
	})
		.then(resp => {
			dispatch(setUser(resp.data))
			resolve(resp.data)
		})
})

export const refreshToken = token => dispatch => new Promise(resolve => {
	axios.get(apiEndpoints.refreshToken, {
		params: {
			refresh_token: token,
		},
	})
		.then(resp => {
			dispatch(setUser(resp.data))
			resolve(resp.data)
		})
})

export const logOutUser = () => dispatch => new Promise(resolve => {
	dispatch(removeUser())
	resolve(true)
})

export const modifyPassword = (authToken, userId, newPassword) => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.patch(`${apiEndpoints.modifyPassword}/${userId}`, { password: newPassword }, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})

export const getPasswordResetObject = slug => new Promise(resolve => {
	axios.get(`${apiEndpoints.getPasswordRecovery}/${slug}`, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res.data,
			})
		})
})

export const resetPassword = (newPassword, authToken, userId) => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.patch(`${apiEndpoints.resetpassword}/${userId}`, JSON.stringify({
		password: newPassword,
	}), {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})

export const requestPasswordRecovery = (slug, email) => new Promise(resolve => {
	axios.post(`${apiEndpoints.requestPasswordRecovery}`, JSON.stringify({
		slug,
		email,
	}), {
		headers,
	})
		.then(res => {
			resolve({
				...res.data,
			})
		})
})

export const sendPasswordRecoveryEmail = (username, slug, token) => new Promise(resolve => {
	axios.post(`${apiEndpoints.sendPasswordRecoveryEmail}`, JSON.stringify({
		slug,
		username,
		token,
	}), {
		headers,
	})
		.then(res => {
			resolve({
				...res.data,
			})
		})
})

export const getToken = username => new Promise(resolve => {
	axios.post(apiEndpoints.getToken, JSON.stringify({
		username,
	}), {
		headers,
	})
		.then(res => {
			resolve({
				...res.data,
			})
		})
})

export const setPasswordRecoveryToUsed = slug => new Promise(resolve => {
	axios.patch(`${apiEndpoints.setPasswordRecoveryToUsed}/${slug}`, {
		headers,
	})
		.then(res => {
			resolve({
				...res.data,
			})
		})
})

export const modifyUsername = (authToken, userId, newUsername) => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.patch(`${apiEndpoints.modifyUserName}/${userId}`, { username: newUsername }, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})
