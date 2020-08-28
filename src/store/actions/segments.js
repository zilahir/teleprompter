import { GET_ALL_SEGMENTS, ADD_SEGGMENT, CLEAR_ALL_SEGMENTS } from './actionTypes'

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
		type: CLEAR_ALL_SEGMENTS,
		payload: {
			segments: [],
		},
	})
	resolve(segments)
})

export const addSegment = segmentObject => dispatch => {
	dispatch({
		type: ADD_SEGGMENT,
		payload: {
			segment: segmentObject,
		},
	})
}
