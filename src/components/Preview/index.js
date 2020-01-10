import React from 'react'
import { useStore } from 'react-redux'
import { Col } from 'react-grid-system'

/**
* @author zilahir
* @function Preview
* */

const Preview = () => {
	const store = useStore()

	return (
		<>
			<Col lg={6}>
				<p>
					preview
				</p>
			</Col>
		</>
	)
}

export default Preview
