import { SET_FONT_SIZE, SET_TEXT, SET_LETTER_SPACING, SET_LINE_HEIGHT, TOGGLE_FLIPPED } from './actionTypes'

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

export const toggleFlipped = isFlipped => ({
	type: TOGGLE_FLIPPED,
	payload: {
		isFlipped,
	},
})
