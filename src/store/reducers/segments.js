import { GET_ALL_SEGMENTS } from '../actions/actionTypes'

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
	default:
		return state
	}
}

export default reducer
