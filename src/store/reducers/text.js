import { SET_FONT_SIZE, SET_TEXT, SET_LINE_HEIGHT, SET_LETTER_SPACING, SET_SCROLL_WIDTH, SET_SCROLL_SPEED, CLEAR_TEXT, RESET_PROMPTER, TOGGLE_FLIPPED } from '../actions/actionTypes'

const initialState = {
	fontSize: 20,
	text: '',
	lineHeight: 1,
	letterSpacing: 1,
	scrollWidth: '100%',
	scrollSpeed: 1,
	isFlipped: false,
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
	case SET_SCROLL_SPEED: {
		return {
			...state,
			scrollSpeed: action.payload.scrollSpeed,
		}
	}
	case TOGGLE_FLIPPED: {
		return {
			...state,
			isFlipped: action.payload.isFlipped,
		}
	}
	case CLEAR_TEXT: {
		return {
			...state,
			text: '',
		}
	}
	case RESET_PROMPTER:
		return {
			...initialState,
		}
	default:
		return state
	}
}

export default reducer
