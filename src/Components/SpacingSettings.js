import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';

export default class SpacingSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        const editMode = props.adminMode === "Edit";
        this.state = {
            
            updated: false,
            saved: false,
            fields: {
                "--form-border-radius": editMode ? props.cssConfig["--form-border-radius"]: "20px",
                "--form-border-width": editMode ? props.cssConfig["--form-border-width"]: '2px',
                "--form-padding": editMode ? props.cssConfig["--form-padding"] : '0',
                "--panel-border-radius": editMode ? props.cssConfig["--panel-border-radius"]: "0",
                "--panel-border-width": editMode ? props.cssConfig["--panel-border-width"]: '0',
                "--panel-padding": editMode ? props.cssConfig["--panel-padding"]: '10px',
                "--panel-space-between": editMode ? props.cssConfig["--panel-space-between"]: "20px"
            },
            errors: {
                "--form-padding": "",
                "--form-border-radius": "",
                "--form-border-width": "",
                "--panel-padding": "",
                "--panel-border-radius": "",
                "--panel-border-width": "",
                "--panel-space-between": ""
            }            
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderInputs = this.renderInputs.bind(this)
    }


    handleButtonClick(e, ctx) {
        
    }


    handleInputChange(e) {
       
    }

    renderInputs(fields) {
        const feildNames = Object.keys(fields);
        return feildNames.map((field, ind)=>{
            return (
                <div key={`field-${ind}`} styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                    <InputGroup
                        type="text"
                        id={`color-${field}`}
                        specialStyle="" 
                        label={field.substring(2)}
                        placeholder="CSS"
                        maxLength={32} 
                        required={true} 
                        value={fields[field]} 
                        handleInputChange={this.handleInputChange} 
                        error={this.state.errors[field]} 
                    />
                </div>
            )
        })
    }
   
    render() {
        const {fields, errors} = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Spacing Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        {
                            this.renderInputs(fields)
                        }
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