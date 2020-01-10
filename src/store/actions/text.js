import { SET_FONT_SIZE, SET_TEXT } from './actionTypes'

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
