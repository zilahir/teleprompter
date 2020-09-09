import { MONO, SERIF } from './consts'

export const getFontFamily = chosenFont => {
	let font = 'Barlow'

	if (chosenFont === MONO.toLowerCase()) {
		font = '\'Courier Prime\', monospace'
	} else if (chosenFont === SERIF.toLowerCase()) {
		font = '\'Crimson Pro\', serif'
	}
	return font
}
