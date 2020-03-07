import { GET_ALL_PROMPTER } from '../actions/actionTypes'

const initialState = {
	usersPrompters: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_PROMPTER:
		return {
			...state,
			usersPrompters: action.payload.usersPrompters,
		}
	default:
		return state
	}
}

export default reducer
