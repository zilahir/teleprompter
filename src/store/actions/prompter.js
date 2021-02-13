import axios from 'axios'

import { headers } from '../../utils/consts'
import { apiEndpoints } from '../../utils/apiEndpoints'
import { GET_ALL_PROMPTER, SET_PROMPTER_SLUG, SET_PROJECT_NAME, CLEAR_ALL_PROMPTER, COPY_PROMPTER_OBJECT, CLEAR_PROMPTER_OBJECT } from './actionTypes'

export const setAllPrompterForUser = usersPrompters => dispatch => new Promise(resolve => {
	dispatch({
		type: GET_ALL_PROMPTER,
		payload: {
			usersPrompters,
		},
	})
	resolve(usersPrompters)
})

export const clearUserPrompters = () => dispatch => new Promise(resolve => {
	dispatch({
		type: CLEAR_ALL_PROMPTER,
		payload: {},
	})
	resolve({
		success: true,
	})
})

export const getAllUserPrompter = (userId, authToken) => dispatch => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.get(`${apiEndpoints.getAllPrompterForUser}/${userId}`, {
		headers,
	})
		.then(resp => {
			dispatch(clearUserPrompters())
			dispatch(setAllPrompterForUser(resp.data))
			resolve(resp.data)
		})
})

export const setPrompterSlug = prompterSlug => dispatch => new Promise(resolve => {
	dispatch({
		type: SET_PROMPTER_SLUG,
		payload: {
			prompterSlug,
		},
	})
	resolve(prompterSlug)
})

export const setPrompterProjectName = projectName => dispatch => new Promise(resolve => {
	dispatch({
		type: SET_PROJECT_NAME,
		payload: {
			projectName,
		},
	})
	resolve(projectName)
})

export const copyPrompterObject = prompterObject => dispatch => new Promise(resolve => {
	dispatch({
		type: COPY_PROMPTER_OBJECT,
		payload: {
			prompterObject,
		},
	})
	resolve(prompterObject)
})

export const clearPrompterObject = () => dispatch => new Promise(resolve => {
	dispatch({
		type: CLEAR_PROMPTER_OBJECT,
		payload: {},
	})
	resolve(true)
})

export const createNewPrompterNoAuth = (
	newPrompterObject, endPoint,
) => new Promise(resolve => {
	axios.post(`${endPoint}`, newPrompterObject, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})

export const createNewPrompter = (
	newPrompterObject, authToken,
) => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.post(`${apiEndpoints.newPrompter}`, newPrompterObject, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})

export const deletePrompter = (idToDel, authToken) => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.delete(`${apiEndpoints.delPrompter}/${idToDel}`, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})

export const updatePrompterNoAuth = updatedPrompterObject => new Promise(resolve => {
	axios.patch(`${apiEndpoints.updatePrompterNoAuth}/${updatedPrompterObject.slug}`, updatedPrompterObject, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})

export const isProverSaved = slug => new Promise(resolve => {
	axios.get(`${apiEndpoints.getPrompterBySlug}/${slug}`, {
		headers,
	})
		.then(res => {
			resolve({
				...res.data,
			})
		})
})

export const updatePrompter = updatedPrompterObject => new Promise(resolve => {
	axios.patch(`${apiEndpoints.modifyPrompter}/${updatedPrompterObject.slug}`, updatedPrompterObject, {
		headers,
	})
		.then(res => {
			resolve({
				isSuccess: true,
				...res,
			})
		})
})

export const getPrompterBySlug = slug => new Promise(resolve => {
	axios.get(`${apiEndpoints.getPrompterBySlugNoAuth}/${slug}`, {
		headers,
	})
		.then(response => {
			resolve(response.data)
		})
})
