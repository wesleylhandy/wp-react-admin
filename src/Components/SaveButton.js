import React from 'react'

import FormButton from './FormButton'

import form from './styles/form.css'
import flex from './styles/flex.css'
import error from './styles/error.css'

export default function SaveButton(props) {

    return (
        <fieldset styleName="form.fieldset" style={{position: "relative"}}>
            <div style={{maxWidth: "88px"}}>
                <FormButton val="Save" handleClick={props.handleButtonClick} submitting={props.submitting} ctx={props.ctx} />
            </div>
            <div styleName="error.error">{props.error}</div>
            <div styleName="flex.flex flex.flex-row flex.flex-center" style={{textAlign: "center", color: "darkblue", opacity: props.formMsg ? "1" : "0", transition: "opacity 200ms ease-in-out"}}>
                {props.formMsg}
            </div>
        </fieldset>
    )
}