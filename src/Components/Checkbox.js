import React from 'react'
import checkbox from './styles/checkbox.css'
import input from './styles/input.css'

export default function Checkbox(props) {
    return (
        <div styleName="input.form-group">
            <input 
                type='checkbox' 
                styleName="checkbox.checkbox-input"
                id={props.id} 
                name={props.id} 
                checked={props.checked} 
                onChange={props.handleInputChange}
            />
            <label htmlFor={props.id}>{props.label}</label> 
        </div>
    )
}