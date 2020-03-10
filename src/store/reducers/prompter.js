import { GET_ALL_PROMPTER, SET_PROMPTER_SLUG } from '../actions/actionTypes'

const initialState = {
	usersPrompters: [],
	prompterSlug: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_ALL_PROMPTER:
		return {
			...state,
			usersPrompters: action.payload.usersPrompters,
		}
	case SET_PROMPTER_SLUG:
		return {
			...state,
			prompterSlug: action.payload.prompterSlug,
		}
	default:
		return state
	}
}

export default reducer
