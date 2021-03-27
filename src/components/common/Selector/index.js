import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { theme } from '../../../utils/theme'
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
	const { items, activeId, onClick } = props

	function handleChange(chosenId) {
		onClick(chosenId)
	}
	return (
		<div className={styles.selectorContainer}>
			{
				items.map((item, index) => (
					<Item
						key={item.id}
						isFirst={index === 0}
						isLast={index === items.length - 1}
						isActive={activeId === index}
						onClick={() => handleChange(item.id)}
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
	activeId: PropTypes.number.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.any,
	).isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Selector
