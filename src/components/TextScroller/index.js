/*eslint-disable*/

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import Scroll from 'react-scroll'
import styles from './TextScroller.module.scss'

export default class TextScroller extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        fontSize: PropTypes.string,
        flipX: PropTypes.bool,
        width: PropTypes.string,
        height: PropTypes.string,
        scrollDurationLine: PropTypes.number
    };

    static defaultProps = {
        text: '',
        fontSize: 'xx-large',
        flipX: false,
        width: 'auto',
        height: 'auto',
        scrollDurationLine: 1000
    };
    scroll = () => {
        const {scrollDurationLine} = this.props;
        const displayText = this.refDisplayText.current;
        const numLines = displayText.getClientRects().length;
        const {top, height} = displayText.getBoundingClientRect();

        const bottom = window.scrollY + top + height;

        Scroll.animateScroll.scrollTo(bottom, {
            duration: scrollDurationLine * numLines,
            smooth: 'linear',
            offset: height
        });
    };

    constructor() {
        super();
        this.refDisplayText = React.createRef();
    }

    render() {
        const {text, fontSize, flipX, width, height} = this.props;

        return (
            <div
                className={classNames(styles.displayTextContainer, {[styles.flipX]: flipX})}
                style={{width: width, height: height}}>
                <p ref={this.refDisplayText}
                    className={styles.displayText}
                    style={{fontSize: fontSize}}
                >
                        {text}
                </p>
            </div>
        )
    }
}