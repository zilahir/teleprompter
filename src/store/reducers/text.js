import { SET_FONT_SIZE } from '../actions/actionTypes'

const initialState = {
	fontSize: 18,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_FONT_SIZE:
		return {
			...state,
			fontSize: action.payload.fontSize,
		}
	default:
		return state
	}
}

export default reducer
