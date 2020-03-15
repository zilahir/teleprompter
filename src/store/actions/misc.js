import { TOGGLE_UPDATE_BTN } from './actionTypes'

export const toggleUpdateBtn = boolean => dispatch => new Promise(resolve => {
	dispatch({
		type: TOGGLE_UPDATE_BTN,
		payload: {
			boolean,
		},
	})
	resolve(true)
})
