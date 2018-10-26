import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';

export default class StyleSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        this.state = {
            editMode: props.editMode,
            updated: false,
            saved: false,
            fields: {
                ...props.fields
            },
            errors: {
                ...props.errors
            },
            headline: props.headline
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }


    handleButtonClick(e, ctx) {
        
    }


    handleInputChange(e) {
       
    }
   
    render() {
        const {fields, errors, headline} = this.state;
        const inputs = Object.keys(fields).map((el, ind)=>{
            const label = el.includes('externalFont') ? el : el.substring(2);
            return (
                <div key={`color-${ind}`} styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                    <InputGroup
                        type="text"
                        id={el} 
                        specialStyle="" 
                        label={label} 
                        placeholder="css" 
                        maxLength={32} 
                        required={true} 
                        value={fields[el]} 
                        handleInputChange={this.handleInputChange} 
                        error={errors[el]} 
                    />
                </div>
            )
        })
        return (
            <React.Fragment>
                <form>
                    <h3>{headline}</h3>
                    <fieldset styleName="form.fieldset">
                        {inputs}
                        
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                        <div style={{maxWidth: "88px"}}>
                            <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: "store", val: '', type: 'cssConfig'}} />
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}