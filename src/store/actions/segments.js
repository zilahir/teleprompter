import { GET_ALL_SEGMENTS } from './actionTypes'

export const setSegments = segments => dispatch => new Promise(resolve => {
	dispatch({
		type: GET_ALL_SEGMENTS,
		payload: {
			segments,
		},
	})
	resolve(segments)
})
