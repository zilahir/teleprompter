import axios from 'axios'

import { headers } from '../../utils/consts'
import { apiEndpoints } from '../../utils/apiEndpoints'
import { GET_ALL_PROMPTER, SET_PROMPTER_SLUG } from './actionTypes'

export const setAllPrompterForUser = usersPrompters => dispatch => new Promise(resolve => {
	dispatch({
		type: GET_ALL_PROMPTER,
		payload: {
			usersPrompters,
		},
	})
	resolve(usersPrompters)
})

export const getAllUserPrompter = (userId, authToken) => dispatch => new Promise(resolve => {
	axios.defaults.headers.common.authorization = `Bearer ${authToken}`
	axios.get(`${apiEndpoints.getAllPrompterForUser}/${userId}`, {
		headers,
	})
		.then(resp => {
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