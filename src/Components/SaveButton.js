import React from 'react'

import FormButton from './FormButton'

import form from './styles/form.css'
import flex from './styles/flex.css'
import error from './styles/error.css'

export default function SaveButton(props) {

    return (
        <fieldset styleName="form.fieldset" style={{position: "relative"}}>
            <div style={{maxWidth: "88px"}}>
                <FormButton val="Save" handleClick={props.handleClick} submitting={props.submitting} ctx={props.ctx} />
            </div>
            <div styleName="error.error">{props.error}</div>
            <div styleName="form.form-msg" style={{opacity: props.formMsg ? "1" : "0"}}>
                {props.formMsg}
            </div>
        </fieldset>
    )
}