import React from 'react'

import flex from './styles/flex.css'
import input from './styles/input.css'
import error from './styles/error.css'

export default function TextGroup(props) {
    return (
        <div id={`form-field-${props.id}`} styleName={`${props.specialStyle ? props.specialStyle : ""} input.form-group flex.flex-grow`}>
            <label htmlFor={props.id}>{props.label}<span>{props.required ? '*' : ''}</span></label>
            <textarea styleName={`input.form-control ${props.email ? "input.textarea__large" : ""}${props.error ? " input.error" : ""}`}
                id={props.id}
                maxLength={props.maxLength} 
                name={props.id} 
                placeholder={props.placeholder}
                required={props.required}
                onChange={props.handleInputChange}
                value={props.value}
                aria-invalid={props.error ? true : false} 
                onBlur={props.handleBlur}
            />
            <div styleName="error.error">{props.error}</div>
        </div>
    )
}