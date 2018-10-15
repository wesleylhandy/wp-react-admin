import React from 'react'

import styles from './styles/index.css'

export default function FormButton(props) {
    return (
        <a onClick={e => props.handleClick(e, props.ctx)} styleName="">{props.val}</a>
    )
}