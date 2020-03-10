/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useStore } from 'react-redux'
import styled from 'styled-components'

import { setScrollWidth } from '../../../store/actions/text'
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
	const store = useStore()
	const dispatch = useDispatch()
	const getActiveWidth = items.find(curr => (
		curr.label === store.getState().text.scrollWidth
	))

	const [isActive, setActive] = useState(getActiveWidth.id)
	function handleChange(index) {
		const chosenValue = items.find(item => (
			item.id === index
		))
		dispatch(setScrollWidth(chosenValue.label))
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
