import { SET_FONT_SIZE, SET_TEXT } from '../actions/actionTypes'

const initialState = {
	fontSize: 18,
	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat leo id eleifend maximus. Vestibulum in ligula sem. Praesent efficitur, mi nec vehicula congue, augue nibh iaculis ante, nec fermentum erat lectus eget metus. Curabitur at augue finibus velit finibus accumsan non sit amet est. Quisque a aliquet nisi. Donec vel imperdiet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat mauris vel consequat finibus. Aliquam imperdiet justo ac ex malesuada egestas. In hac habitasse platea dictumst. Ut vehicula pellentesque nibh quis tristique. Quisque nec sapien non erat porttitor tempor et a risus. Nunc libero augue, sagittis et tristique a, efficitur ut nunc. In lobortis leo nec enim aliquam, in placerat risus suscipit. Aenean ut lorem mauris. Vestibulum suscipit, justo eu euismod posuere, turpis dolor aliquet ipsum, sit amet cursus justo est eu tellus.Integer cursus metus tristique, elementum mi ac, rhoncus felis. Nam iaculis, metus quis hendrerit mattis, neque ligula suscipit justo, id mattis enim metus id sem. Ut pellentesque, libero et ullamcorper commodo, odio ligula commodo sapien, sit amet semper sem risus eu sem. Vivamus vel gravida purus. Nullam ullamcorper neque posuere feugiat scelerisque. Curabitur feugiat nibh quam, id fermentum magna commodo sed. In sagittis erat felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus at sem ultrices, porttitor risus auctor, accumsan nulla.Praesent cursus sapien eros, id varius lacus maximus sit amet. Praesent vel vulputate libero. Aliquam neque dolor, pellentesque vel lobortis eu, aliquet malesuada odio. Nullam ac nulla turpis. Nulla augue purus, consectetur eu lacus sagittis, porta scelerisque quam. Integer at porta orci, vitae vehicula neque. Nunc volutpat tempus mi vel maximus. Maecenas finibus sollicitudin ipsum, pharetra volutpat enim ornare a. Aenean consectetur in nisl ut tempor. Nullam vitae lacus sit amet enim finibus varius volutpat nec purus. Duis faucibus, nibh et finibus viverra, massa urna sollicitudin felis, auctor luctus mi mauris a purus.Quisque dapibus urna at elit facilisis, sed sollicitudin dui bibendum. Donec sed sapien ut enim dapibus convallis tincidunt eget elit. Vestibulum vel erat diam. Nullam lectus urna, dignissim non dolor non, cursus malesuada diam. Fusce condimentum nulla egestas metus pretium tincidunt. Phasellus pharetra tortor eget feugiat pretium. Nullam bibendum lobortis vulputate. In finibus semper placerat. Etiam sed metus tincidunt, imperdiet sapien et, posuere velit. Morbi magna eros, luctus ut accumsan sed, scelerisque quis ex. Suspendisse tempor elit ac metus convallis, eget luctus odio feugiat.Nullam suscipit velit elit, id aliquam tortor ultricies eget. Etiam tempus urna in elit imperdiet fermentum. Vestibulum mollis, velit ac mattis consectetur, ante ante gravida erat, ac aliquam neque erat ut libero. Vivamus at tortor sed velit hendrerit eleifend blandit nec purus. Maecenas tempus enim euismod massa fringilla, sit amet rhoncus risus posuere. Nunc ut laoreet est. Maecenas malesuada tellus id scelerisque egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ut euismod libero, at lacinia ante. Vivamus ligula lectus, blandit id nunc quis, volutpat consequat ex. Proin ultrices, mauris in elementum gravida, lacus nibh ullamcorper ipsum, ut consequat est ligula quis neque.',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_FONT_SIZE:
		return {
			...state,
			fontSize: action.payload.fontSize,
		}
	case SET_TEXT:
		return {
			...state,
			text: action.payload.text,
		}
	default:
		return state
	}
}

export default reducer
