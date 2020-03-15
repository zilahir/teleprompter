import { TOGGLE_UPDATE_BTN, HIDE_INSTRUCTION } from './actionTypes'

export const toggleUpdateBtn = boolean => dispatch => new Promise(resolve => {
	dispatch({
		type: TOGGLE_UPDATE_BTN,
		payload: {
			boolean,
		},
	})
	resolve(true)
})

export const hideInstruction = (whichInstruction, boolean) => dispatch => new Promise(resolve => {
	dispatch({
		type: HIDE_INSTRUCTION,
		payload: {
			whichInstruction,
			boolean,
		},
	})
	resolve({
		success: true,
	})
})
