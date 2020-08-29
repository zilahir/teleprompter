import { GET_ALL_SEGMENTS, ADD_SEGGMENT, CLEAR_ALL_SEGMENTS, MODIFY_SEGMENT } from '../actions/actionTypes'

const initialState = {
	segments: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_SEGMENTS:
		return {
			...state,
			segments: action.payload.segments,
		}
	case ADD_SEGGMENT:
		return {
			...state,
			segments: state.segments.concat(action.payload.segment),
		}
	case CLEAR_ALL_SEGMENTS:
		return {
			...state,
			segments: [],
		}
	case MODIFY_SEGMENT: {
		const modifiedArray = state.segments.map(
			currSegment => ((
				currSegment.id === action.payload.id) ? action.payload.segmentObject : currSegment
			),
		)
		return {
			...state,
			segments: modifiedArray,
		}
	}
	default:
		return state
	}
}

export default reducer
