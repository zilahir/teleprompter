import { SET_FONT_SIZE, SET_TEXT } from '../actions/actionTypes'

const initialState = {
	fontSize: 18,
	text: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_FONT_SIZE:
		return {
			...state,
			fontSize: action.payload.fontSize,
		}
	case SET_TEXT:
		return {
			...state,
			text: action.payload.text,
		}
	default:
		return state
	}
}

export default reducer
