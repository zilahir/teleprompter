import React from 'react'
import { Row } from 'react-grid-system'

import EditorSidebar from '../EditorSidebar'
import ActionSidebar from '../ActionSidebar'
import Preview from '../Preview'

/**
* @author zilahir
* @function Main
* */

const Main = () => (
	<div>
		<Row>
			<EditorSidebar />
			<Preview />
			<ActionSidebar />
		</Row>
	</div>
)

export default Main
