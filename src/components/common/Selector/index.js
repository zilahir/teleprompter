/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'react-redux'
import styled from 'styled-components'

import { Colors as teleprompterColors } from '../../../utils/consts'
import styles from './Selector.module.scss'

/**
* @author
* @function Selector
* */

const Item = styled.div`
	background-color: ${props => (props.isActive ? teleprompterColors.purple : teleprompterColors.gray1)};
	border-top-left-radius: ${props => (props.isFirst ? '10px' : '0px')};
	border-bottom-left-radius: ${props => (props.isFirst ? '10px' : '0px')};
	border-top-right-radius: ${props => (props.isLast ? '10px' : '0px')};
	border-bottom-right-radius: ${props => (props.isLast ? '10px' : '0px')};
	
`

const Selector = props => {
	const { items } = props
	const [isActive, setActive] = useState(0)
	const store = useStore()

	function handleChange(index) {
		setActive(index)
	}
	return (
		<div className={styles.selectorContainer}>
			{
				items.map((item, index) => (
					<Item
						key={item.id}
						isFirst={index === 0}
						isLast={index === items.length - 1}
						isActive={isActive === index}
						onClick={() => handleChange(index)}
						className={styles.selectorItem}
					>
						<p className={styles.label}>
							{item.label}
						</p>
					</Item>
				))
			}
		</div>
	)
}

Selector.propTypes = {
	items: PropTypes.arrayOf().isRequired,
}

export default Selector
