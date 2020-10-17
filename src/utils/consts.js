import React from 'react'
import { ic_format_align_left as alignLeft } from 'react-icons-kit/md/ic_format_align_left'
import { ic_format_align_right as alignRight } from 'react-icons-kit/md/ic_format_align_right'
import { ic_format_align_center as alignCenter } from 'react-icons-kit/md/ic_format_align_center'
import Icon from 'react-icons-kit'

export const COLOR_DARK = 'COLOR_DARK'
export const COLOR_LIGHT = 'COLOR_LIGHT'

export const Colors = {
	purple: '#8380FF',
	gray1: '#1E1E1E',
	gray2: '#2D2D2D',
	gray3: '$gray-3',
	gray4: '#3A3A3A',
}

export const scrollWidthSettngs = [
	{ id: 0, label: '50%' },
	{ id: 1, label: '75%' },
	{ id: 2, label: '100%' },
]

export const segmentColors = ['#DF4BCB', '#CFEB70', '#C1C1C1', '#5FA3E8', '#F4A836']

export const BUTTON = 'BUTTON'
export const LINK = 'LINK'
export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const PASSWORD = 'PASSWORD'
export const SAVE = 'SAVE'
export const SAVE_AS_COPY = 'SAVE_AS_COPY'
export const LOAD = 'LOAD'
export const LOGGED_IN = 'loggedIn'
export const NEW_PROMPTER = 'NEW_PROMPTER'
export const MAC_OS = 'Mac OS'

export const HELPER_TOP = 'Write or paste your script into the input field below. You can adjust the prompter settings on the left and see a live preview on the top right. Press "Create" to create you prompter. You can then press "Open" to open the prompter in a new tab, or copy the "Stream address" to open the prompter on another computer. You can also copy the "Remote phone address" to open a remote control on your phone. If you make changes to your prompter, click "Update" in your editor first and then in your prompter to apply the updates.'
export const HELPER_SIDEBAR = 'This is an alpha release, which means it\'s not finished. You can report bugs, give feedback or suggest features by emailing info@prompter.me.'
export const INFOBOX_TOP = 'INFOBOX_TOP'
export const INFOBOX_SIDEBAR = 'INFOBOX_SIDEBAR'
export const FULL_LOADER = 'FULL_LOADER'
export const INLINE_LOADER = 'INLINE_LOADER'

export const headers = {
	'Content-Type': 'application/json',
}

export const SPACE = 'space'
export const PAGEUP = 'pageup'
export const PAGE_DOWN = 'pagedown'
export const UP = 'up'
export const DOWN = 'down'
export const F6 = 'f6'
export const LEFT = 'left'
export const RIGHT = 'right'
export const ENTER = 'enter'

export const keyListeners = [
	SPACE,
	PAGEUP,
	PAGE_DOWN,
	UP,
	DOWN,
	F6,
	LEFT,
	RIGHT,
]

export const INC_SPEED = 'INC_SPEED'
export const DEC_SPEED = 'DEC_SPEED'

export const HOME = 'home'
export const PLAYER = 'player'
export const REMOTE = 'remote'
export const POLICY = 'policy'
export const ABOUT = 'about'
export const FORGOTTEN_PW = 'password'
export const CREATE = 'Create Prompter'
export const CREATED = 'CREATED'
export const OPEN = 'OPEN'
export const DARK_THEME = 'DARK'
export const LIGHT_THEME = 'LIGHT'
export const SANS = 'SANS'
export const SERIF = 'SERIF'
export const MONO = 'MONO'

export const colorSchemeSettings = [
	{ id: 0, label: `${DARK_THEME.toLowerCase()}` },
	{ id: 1, label: `${LIGHT_THEME.toLowerCase()}` },
]

export const fontOptions = [
	{ id: 0, label: `${SANS.toLowerCase()}` },
	{ id: 1, label: `${SERIF.toLowerCase()}` },
	{ id: 2, label: `${MONO.toLowerCase()}` },
]

export const colors = [
	'#f44336',
	'#e91e63',
	'#9c27b0',
	'#673ab7',
	'#3f51b5',
	'#2196f3',
	'#03a9f4',
	'#00bcd4',
	'#009688',
	'#4caf50',
	'#8bc34a',
	'#cddc39',
	'#ffeb3b',
	'#ffc107',
	'#ff9800',
	'#ff5722',
	'#795548',
	'#607d8b',
]

export const SEGMENT = 'SEGMENT'
export const BREAK = 'BREAK'
export const CENTER = 'CENTER'

export const alignmentOptions = [
	{ id: 0, label: <Icon icon={alignLeft} size="15px" />, option: LEFT },
	{ id: 1, label: <Icon icon={alignCenter} size="15px" />, option: CENTER },
	{ id: 2, label: <Icon icon={alignRight} size="15px" />, option: RIGHT },
]
