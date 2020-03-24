import { AUTH_USER, REMOVE_USER } from '../actions/actionTypes'

const initialState = {
	user: null,
	loggedIn: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH_USER:
		return {
			...state,
			user: action.payload.user,
			loggedIn: action.payload.user.isSuccess,
		}
	case REMOVE_USER:
		return {
			...state,
			user: null,
			loggedIn: false,
		}
	default:
		return state
	}
}

export default reducer
