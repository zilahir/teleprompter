import { TOGGLE_UPDATE_BTN, HIDE_INSTRUCTION } from '../actions/actionTypes'

const initialState = {
	showActiveBtn: false,
	instructions: {
		HELPER_SIDEBAR: true,
		INFOBOX_SIDEBAR: true,
	},
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case TOGGLE_UPDATE_BTN:
		return {
			...state,
			showActiveBtn: action.payload.boolean,
		}
	case HIDE_INSTRUCTION:
		return {
			...state,
			instructions: {
				...state.instructions,
				[action.payload.whichInstruction]: action.payload.boolean,
			},
		}
	default:
		return state
	}
}

export default reducer
