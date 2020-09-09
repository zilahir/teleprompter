import { SET_FONT_SIZE, SET_TEXT, SET_LETTER_SPACING, SET_LINE_HEIGHT, TOGGLE_FLIPPED, SET_SCROLL_WIDTH, SET_SCROLL_SPEED, CLEAR_TEXT, RESET_PROMPTER, SET_FONT, SET_TEXT_ALIGNMENT } from './actionTypes'

export const setFontSize = fontSize => ({
	type: SET_FONT_SIZE,
	payload: {
		fontSize,
	},
})

export const setText = text => ({
	type: SET_TEXT,
	payload: {
		text,
	},
})

export const clearText = () => ({
	type: CLEAR_TEXT,
	payload: {},
})

export const setLetterSpacing = letterSpacing => ({
	type: SET_LETTER_SPACING,
	payload: {
		letterSpacing,
	},
})

export const setLineHeight = lineHeight => ({
	type: SET_LINE_HEIGHT,
	payload: {
		lineHeight,
	},
})

export const toggleMirror = isFlipped => ({
	type: TOGGLE_FLIPPED,
	payload: {
		isFlipped,
	},
})

export const setScrollWidth = scrollWidth => ({
	type: SET_SCROLL_WIDTH,
	payload: {
		scrollWidth,
	},
})

export const setScrollSpeed = scrollSpeed => ({
	type: SET_SCROLL_SPEED,
	payload: {
		scrollSpeed,
	},
})

export const resetPrompter = () => dispatch => new Promise(resolve => {
	dispatch({
		type: RESET_PROMPTER,
		payload: {},
	})
	resolve({
		success: true,
	})
})

export const setFont = chosenFont => dispatch => {
	dispatch({
		type: SET_FONT,
		payload: {
			chosenFont,
		},
	})
}

export const setTextAlignment = textAlignment => dispatch => {
	dispatch({
		type: SET_TEXT_ALIGNMENT,
		payload: {
			textAlignment,
		},
	})
}
