import random from 'random'

import { colors } from '../consts'

const segmentsApi = {
	segments: [
		{ id: 1, segmentTitle: 'Lorem ipsum', segmentText: 'lofasz', segmentColor: colors[random.int(0, colors.length - 1)] },
		{ id: 2, segmentTitle: 'Lorem ipsum', segmentText: 'Eu duis Lorem pariatur sit aute enim. Deserunt ea amet veniam ex sit incididunt officia excepteur. Consectetur do dolor nisi non quis laboris eu consectetur nisi esse labore. Ea nostrud qui culpa excepteur voluptate est amet tempor. Dolore exercitation proident officia laboris. Enim sunt nisi sit deserunt duis aute dolore elit cupidatat ipsum fugiat irure est occaecat.', segmentColor: colors[random.int(0, colors.length - 1)] },
		{ id: 3, segmentTitle: 'Lorem ipsum', segmentText: 'Eu duis Lorem pariatur sit aute enim. Deserunt ea amet veniam ex sit incididunt officia excepteur. Consectetur do dolor nisi non quis laboris eu consectetur nisi esse labore. Ea nostrud qui culpa excepteur voluptate est amet tempor. Dolore exercitation proident officia laboris. Enim sunt nisi sit deserunt duis aute dolore elit cupidatat ipsum fugiat irure est occaecat.', segmentColor: colors[random.int(0, colors.length - 1)] },
		{ id: 4, segmentTitle: 'Lorem ipsum', segmentText: 'Eu duis Lorem pariatur sit aute enim. Deserunt ea amet veniam ex sit incididunt officia excepteur. Consectetur do dolor nisi non quis laboris eu consectetur nisi esse labore. Ea nostrud qui culpa excepteur voluptate est amet tempor. Dolore exercitation proident officia laboris. Enim sunt nisi sit deserunt duis aute dolore elit cupidatat ipsum fugiat irure est occaecat.', segmentColor: colors[random.int(0, colors.length - 1)] },
		{ id: 5, segmentTitle: 'Lorem ipsum', segmentText: 'Eu duis Lorem pariatur sit aute enim. Deserunt ea amet veniam ex sit incididunt officia excepteur. Consectetur do dolor nisi non quis laboris eu consectetur nisi esse labore. Ea nostrud qui culpa excepteur voluptate est amet tempor. Dolore exercitation proident officia laboris. Enim sunt nisi sit deserunt duis aute dolore elit cupidatat ipsum fugiat irure est occaecat.', segmentColor: colors[random.int(0, colors.length - 1)] },
	],

	getAllSegments() { return this.segments },
}

export default segmentsApi
