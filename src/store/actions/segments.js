import { GET_ALL_SEGMENTS, REMOVE_SEGMENT, ADD_SEGGMENT } from './actionTypes'

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

export const addSegment = segmentObject => dispatch => {
	dispatch({
		type: ADD_SEGGMENT,
		payload: {
			segment: segmentObject,
		},
	})
}
