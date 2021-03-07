import { textState } from '../reducers/text'

export const migrateStore = {
	3: state => ({
		...state,
		text: {
			...textState,
		},
	}),
}
