import { TEST } from '../actions/actionTypes'

const initialState = {
	testItem: 'test',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case TEST:
		return {
			...state,
			testItem: action.payload.testItem,
		}
	default:
		return state
	}
}

export default reducer
