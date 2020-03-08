import { SET_FONT_SIZE, SET_TEXT, SET_LETTER_SPACING, SET_LINE_HEIGHT, TOGGLE_FLIPPED, SET_SCROLL_WIDTH, SET_SCROLL_SPEED } from './actionTypes'

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

export const setScrollWidth = scrollWidth => ({
	type: SET_SCROLL_WIDTH,
	payload: {
		scrollWidth,
	},
})

export const setScrollSpeed = scrollSpeed => ({
	type: SET_SCROLL_SPEED,
	payload: {
		scrollSpeed: (scrollSpeed * scrollSpeed) + 10,
	},
})
