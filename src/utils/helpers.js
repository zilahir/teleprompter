import { isEqual } from 'lodash'

export const shallowComparePrompterObjects = (a, b) => (
	isEqual(a, b)
)
