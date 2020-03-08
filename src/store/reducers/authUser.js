import { AUTH_USER, REMOVE_USER } from '../actions/actionTypes'

const initialState = {
	user: null,
	business: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH_USER:
		return {
			...state,
			user: action.payload.user,
		}
	case REMOVE_USER:
		return {
			...state,
			user: null,
			business: null,
		}
	default:
		return state
	}
}

export default reducer
