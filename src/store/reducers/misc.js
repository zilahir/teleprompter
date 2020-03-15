import { TOGGLE_UPDATE_BTN } from '../actions/actionTypes'

const initialState = {
	showActiveBtn: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case TOGGLE_UPDATE_BTN:
		return {
			...state,
			showActiveBtn: action.payload.boolean,
		}
	default:
		return state
	}
}

export default reducer
