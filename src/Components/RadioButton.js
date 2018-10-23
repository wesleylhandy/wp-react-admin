import React from 'react'
import flex from './styles/flex.css'
import radio from './styles/radio.css'

export default function RadioButton(props) {
    return (
        <div id={`${props.id}-group`} styleName="flex.flex flex.flex-row flex.flex-axes-center radio.radio-group">
            <input styleName="radio.radio-group__input" name={props.name} id={`${props.id}gift`} type="radio" checked={props.checked} onChange={props.handleRadioClick}/>
            <label htmlFor={`${props.id}gift`}>{props.label}</label>
        </div>
    )
}