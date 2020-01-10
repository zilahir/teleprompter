import { GET_ALL_SEGMENTS, REMOVE_SEGMENT } from './actionTypes'

export const setSegments = segments => dispatch => new Promise(resolve => {
	dispatch({
		type: GET_ALL_SEGMENTS,
		payload: {
			segments,
		},
	})
	resolve(segments)
})

export const clearSegments = segments => dispatch => new Promise(resolve => {
	dispatch({
		type: REMOVE_SEGMENT,
		payload: {
			segments: [],
		},
	})
	resolve(segments)
})
