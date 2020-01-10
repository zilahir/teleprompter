import React from 'react'
import { useStore } from 'react-redux'

import styles from './TextEditor.module.scss'

/**
* @author
* @function TextEditor
* */

const TextEditor = () => {
	const store = useStore()
	return (
		<div className={styles.textEditorContainer}>

		</div>
	)
}

export default TextEditor
