import { AUTH_USER } from '../actions/actionTypes'

const initialState = {
	user: null,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case AUTH_USER:
		return {
			...state,
			user: action.payload.user,
		}
	default:
		return state
	}
}

export default reducer
