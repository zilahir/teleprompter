import { GET_ALL_SEGMENTS, ADD_SEGGMENT, CLEAR_ALL_SEGMENTS, MODIFY_SEGMENT } from './actionTypes'

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

export const modifySegment = segmentObject => dispatch => {
	dispatch({
		type: MODIFY_SEGMENT,
		payload: {
			id: segmentObject.id,
			segmentObject,
		},
	})
}

export const addSegment = segmentObject => dispatch => {
	dispatch({
		type: ADD_SEGGMENT,
		payload: {
			segment: segmentObject,
		},
	})
}
