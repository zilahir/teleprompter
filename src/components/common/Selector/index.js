/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useStore, useSelector } from 'react-redux'
import styled from 'styled-components'

import { theme } from '../../../utils/theme'
import { setScrollWidth } from '../../../store/actions/text'
import { Colors as teleprompterColors } from '../../../utils/consts'
import styles from './Selector.module.scss'

/**
* @author
* @function Selector
* */

const Item = styled.div`
	background-color: ${props => (props.isActive ? teleprompterColors.purple : teleprompterColors.gray1)};
	border-top-left-radius: ${props => (props.isFirst ? `${theme.misc.borderRadius}px` : 0)};
	border-bottom-left-radius: ${props => (props.isFirst ? `${theme.misc.borderRadius}px` : 0)};
	border-top-right-radius: ${props => (props.isLast ? `${theme.misc.borderRadius}px` : 0)};
	border-bottom-right-radius: ${props => (props.isLast ? `${theme.misc.borderRadius}px` : 0)};
	
`

const Selector = props => {
	const { items } = props
	const store = useStore()
	const dispatch = useDispatch()
	const scrollWidth = useSelector(state => state.text.scrollWidth)
	const getActiveWidth = items.find(curr => (
		curr.label === scrollWidth
	))


	function handleChange(index) {
		const chosenValue = items.find(item => (
			item.id === index
		))
		dispatch(setScrollWidth(chosenValue.label))
	}
	return (
		<div className={styles.selectorContainer}>
			{
				items.map((item, index) => (
					<Item
						key={item.id}
						isFirst={index === 0}
						isLast={index === items.length - 1}
						isActive={getActiveWidth.id === index}
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
	items: PropTypes.arrayOf(
		PropTypes.any,
	).isRequired,
}

export default Selector
