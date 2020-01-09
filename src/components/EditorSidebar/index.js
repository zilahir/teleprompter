import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

/**
* @author zilahir
* @function EditorSidebar
* */

const EditorSidebar = () => {
	const store = useStore()

	return (
		<>
			<Col lg={3}>
				<p>
					editorsidebar
				</p>
			</Col>
		</>
	)
}

export default EditorSidebar
