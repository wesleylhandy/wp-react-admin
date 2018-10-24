import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        this.state = {
            errors: {},
            fields: {}
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleEditApiKey = this.handleEditApiKey.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        
    }

    handleButtonClick(e, ctx) {
        
    }

    async handleEditApiKey(e) {
        
    }

    handleInputChange(e) {
       
    }
   
    render() {
        const {fields, errors} = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Main Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="form_name" 
                                specialStyle="" 
                                label="Campaign Name/URL Slug" 
                                placeholder="i.e. Giving, or End-of-Year" 
                                maxLength="256" 
                                required={true} 
                                value={fields.form_name} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.form_name} 
                            />
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="thankYouUrl" 
                                specialStyle="" 
                                label="Thank You Page Url" 
                                placeholder="i.e. /thank-you" 
                                maxLength="256" 
                                required={true} 
                                value={fields.thankYouUrl} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.thankYouUrl} 
                            />
                        </div>
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="AddContactYN" checked={fields.AddContactYN} handleInputChange={this.handleInputChange} label="Add Contact with Transaction?"/>
                        </div>
                        {
                            fields.AddContactYN ? (
                                <InputGroup
                                    type="text"
                                    id="ContactSource" 
                                    specialStyle="" 
                                    label="Contact Source" 
                                    placeholder="i.e. 700Club Donor" 
                                    maxLength="20" 
                                    required={true} 
                                    value={fields.ContactSource} 
                                    handleInputChange={this.handleInputChange} 
                                    error={errors.ContactSource} 
                                />
                            ) : null
                        }
                        </fieldset>
                        <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="SectionName" 
                                specialStyle="" 
                                label="Section Name" 
                                placeholder="i.e. 700Club" 
                                maxLength="20" 
                                required={true} 
                                value={fields.SectionName} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.SectionName} 
                            />
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="ActivityName" 
                                specialStyle="" 
                                label="Activity Name" 
                                placeholder="i.e. 700Club_Donation_Activity" 
                                maxLength="50" 
                                required={true} 
                                value={fields.ActivityName} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.ActivityName} 
                            />
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="MotivationText" 
                                specialStyle="" 
                                label="Motivation Code" 
                                placeholder="i.e. 002345" 
                                maxLength="6" 
                                required={true} 
                                value={fields.MotivationText} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.MotivationText} 
                            />
                        </div>
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                        <div style={{maxWidth: "88px"}}>
                            <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: "store", val: '', type: 'formConfig'}} />
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}