import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

export default function FormButton(props) {
    return (
        <div styleName="flex.flex flex.flex-row flex.flex-center flex.flex-axes-center form.form-btn">
            <a onClick={e => props.handleClick(e, props.ctx)} styleName="form.form-btn--action">{props.val}</a>
        </div>
    )
}