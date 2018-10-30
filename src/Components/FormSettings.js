import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';

export default class FormSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
        this.state = {
            updated: false,
            saved: false,
            fields: {
                form_name: props.currentForm.form_name,
                thankYouUrl: editMode ? props.formConfig.thankYouUrl : '',
                AddContactYN: editMode ? props.formConfig.AddContactYN == "Y" : true,
                ContactSource: editMode ? props.formConfig.ContactSource : '',
                SectionName: editMode ? props.formConfig.SectionName : '',
                ActivityName : editMode ? props.formConfig.ActivityName : '',
                MotivationText: editMode ? props.formConfig.MotivationText : ''
            },
            errors: {
                form_name: '',
                thankYouUrl: '',
                AddContactYN: '',
                ContactSource: '',
                SectionName: '',
                ActivityName: '',
                MotivationText: ''
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        
    }

    handleButtonClick(e, ctx) {
        
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
                                value={fields.form_name} 
                                disabled={true}
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