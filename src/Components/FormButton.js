import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

export default function FormButton(props) {
    return (
        <div styleName="flex.flex flex.flex-row flex.flex-center flex.flex-axes-center form.form-btn--wrapper">
            <button disabled={props.submitting} onClick={e => props.handleClick(props.ctx)} styleName="form.form-btn" type="button">{props.val}</button>
        </div>
    )
}