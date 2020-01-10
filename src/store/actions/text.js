import { SET_FONT_SIZE } from './actionTypes'

export const setFontSize = fontSize => ({
	type: SET_FONT_SIZE,
	payload: {
		fontSize,
	},
})
