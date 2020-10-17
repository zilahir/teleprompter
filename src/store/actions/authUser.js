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

export const removeUser = user => dispatch => new Promise(resolve => {
	dispatch({
		type: REMOVE_USER,
		payload: {},
	})
	resolve(user)
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

export const createNewUser = newUserObject => new Promise(resolve => {
	axios.post(apiEndpoints.newUser, JSON.stringify(newUserObject), {
		headers,
	})
		.then(resp => {
			resolve(resp.data)
		})
})

export const checkPassword = userObject => new Promise(resolve => {
	axios.post(apiEndpoints.checkPassword, JSON.stringify(userObject), {
		headers,
	})
		.then(resp => {
			resolve(resp.data)
		})
})

export const deleteAccount = (userId, authToken) => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.delete(`${apiEndpoints.deleteUser}/${userId}`, {
		headers,
	})
		.then(res => {
			resolve(res.data)
		})
})
