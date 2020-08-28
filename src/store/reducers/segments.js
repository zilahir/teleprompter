import { GET_ALL_SEGMENTS, ADD_SEGGMENT, CLEAR_ALL_SEGMENTS } from '../actions/actionTypes'

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
	default:
		return state
	}
}

export default reducer
