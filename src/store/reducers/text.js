import { SET_FONT_SIZE, SET_TEXT, SET_LINE_HEIGHT, SET_LETTER_SPACING, SET_SCROLL_WIDTH } from '../actions/actionTypes'

const initialState = {
	fontSize: 2,
	text: '',
	lineHeight: 1,
	letterSpacing: 0,
	scrollWidth: '100%',
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
	case SET_LINE_HEIGHT:
		return {
			...state,
			lineHeight: action.payload.lineHeight,
		}
	case SET_LETTER_SPACING:
		return {
			...state,
			letterSpacing: action.payload.letterSpacing,
		}
	case SET_SCROLL_WIDTH: {
		return {
			...state,
			scrollWidth: action.payload.scrollWidth,
		}
	}
	default:
		return state
	}
}

export default reducer
