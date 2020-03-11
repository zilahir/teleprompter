import { GET_ALL_PROMPTER, SET_PROMPTER_SLUG, SET_PROJECT_NAME } from '../actions/actionTypes'

const initialState = {
	usersPrompters: [],
	prompterSlug: '',
	projectName: null,
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
	case SET_PROJECT_NAME:
		return {
			...state,
			projectName: action.payload.projectName,
		}
	default:
		return state
	}
}

export default reducer
