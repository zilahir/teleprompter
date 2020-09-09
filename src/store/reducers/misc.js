import { TOGGLE_UPDATE_BTN, HIDE_INSTRUCTION, SET_COLOR_SCHEME } from '../actions/actionTypes'
import { DARK_THEME } from '../../utils/consts'

const initialState = {
	showActiveBtn: false,
	instructions: {
		INFOBOX_TOP: true,
	},
	chosenColorScheme: DARK_THEME,
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
	case SET_COLOR_SCHEME:
		return {
			...state,
			chosenColorScheme: action.payload.chosenColorScheme,
		}
	default:
		return state
	}
}

export default reducer
