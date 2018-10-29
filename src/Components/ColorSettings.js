import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';

export default class ColorSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        const editMode = props.adminMode === "Edit";
        this.state = {
            
            updated: false,
            saved: false,
            fields: {
                "--primary-color": editMode ? props.cssConfig["--primary-color"] : "#1775BC",
                "--base-font-color": editMode ? props.cssConfig["--base-font-color"]: "#333",
                "--base-bg-color": editMode ? props.cssConfig["--base-bg-color"] : "#333",
                "--form-bg-color": editMode ? props.cssConfig["--form-bg-color"] : '#fff',
                "--form-border-color": editMode ? props.cssConfig["--form-border-color"]: 'transparent',
                "--form-text-color": editMode ? props.cssConfig["--form-text-color"]: '#091d44',
                "--heading-color": editMode ? props.cssConfig["--heading-color"]: "#313131",
                "--input-bg-color": editMode ? props.cssConfig["--input-bg-color"]: '#fff',
                "--input-border-color": editMode ? props.cssConfig["--input-border-color"] : '#ccc',
                "--input-text-color": editMode ? props.cssConfig["--input-text-color"]: '#091d44',
                "--hover-bg-color": editMode ? props.cssConfig["--hover-bg-color"]: '#fff',
                "--hover-border-color": editMode ? props.cssConfig["--hover-border-color"] : '#eb4d97',
                "--focus-box-shadow": editMode ? props.cssConfig["--focus-box-shadow"]: "rgba(235, 77, 151, .6)",
                "--placeholder-color": editMode ? props.cssConfig["--placeholder-color"]: '#7F8C9A',
                "--link-color": editMode ? props.cssConfig["--link-color"]: "#1775BC",
                "--link-hover-color": editMode ? props.cssConfig["--link-hover-color"]: "#66afe9",
                "--label-color": editMode ? props.cssConfig["--label-color"]: "#105fa5",
                "--error-color": editMode ? props.cssConfig["--error-color"]: "crimson",
                "--btn-text-color": editMode ? props.cssConfig["--btn-text-color"] : '#fff',
                "--panel-bg-color": editMode ? props.cssConfig["--panel-bg-color"] : '#f5f5f5',
                "--panel-border-color": editMode ? props.cssConfig["--panel-border-color"] : '#888'
            },
            errors: {
                "--primary-color": "",
                "--base-font-color": "",
                "--base-bg-color": "",
                "--form-bg-color": "",
                "--form-border-color": "",
                "--form-text-color": "",
                "--heading-color": "",
                "--input-bg-color": "",
                "--input-border-color": "",
                "--input-text-color": "",
                "--hover-bg-color": "",
                "--hover-border-color": "",
                "--focus-box-shadow": "",
                "--placeholder-color": "",
                "--link-color": "",
                "--link-hover-color": "",
                "--label-color": "",
                "--error-color": "",
                "--btn-text-color": "",
                "--panel-bg-color": "",
                "--panel-border-color": ""
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
                    <div style={{border: "1px solid #ccc", height: "25px", width: "25px", backgroundColor: fields[field]}}></div>
                </div>
            )
        })
    }
   
    render() {
        const {fields, errors} = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Color Setttings</h3>
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