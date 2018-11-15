import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'



export default function FormButton(props) {
    const handleClick = e => {
        e.preventDefault();
        props.handleClick(props.ctx)
    }
    return (
        <div styleName="flex.flex flex.flex-row flex.flex-center flex.flex-axes-center form.form-btn--wrapper">
            <button disabled={props.submitting} onClick={handleClick} styleName="form.form-btn">{props.val}</button>
        </div>
    )
}