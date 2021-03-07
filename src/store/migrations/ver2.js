import { SANS } from '../../utils/consts'

export const migrateStore = {
	2: state => ({
		...state,
		text: {
			...state.text,
			textAlignment: 0,
			chosenFont: SANS,
		},
	}),
}
