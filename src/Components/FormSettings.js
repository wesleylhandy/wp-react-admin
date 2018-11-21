import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';
import RadioButton from './RadioButton';
import withFormConfigHandling from './withFormConfigHandling'

const FormSettings = props => {
    const {fields, errors} = props;
    const pageLocation = window.location.origin + '/' + props.currentForm.form_name + '/';
    return (
        <React.Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); props.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Main Setttings</h3>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id="form_name" 
                            specialStyle="" 
                            label="Campaign Name" 
                            value={props.currentForm.form_name} 
                            disabled={true}
                        />
                    </div>
                    <p styleName="form.form-info">You can now use the Wordpress Shortcode <code styleName="form.form-code">[cbngivingform form_name="{props.currentForm.form_name}"]</code> on page. Please be sure to test as a draft before putting into production.</p>
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
                            handleInputChange={props.handleInputChange} 
                            error={errors.thankYouUrl} 
                        />
                    </div>
                    <p styleName="form.form-info">This will be the page where the donor is redirected after a successful donation.</p>
                </fieldset>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="AddContactYN" checked={fields.AddContactYN === "Y"} handleInputChange={props.handleInputChange} label="Add Contact with Transaction?"/>
                    </div>
                    {
                        fields.AddContactYN === "Y" ? (
                            <InputGroup
                                type="text"
                                id="ContactSource" 
                                specialStyle="" 
                                label="Contact Source" 
                                placeholder="i.e. 700Club Donor" 
                                maxLength="20" 
                                required={true} 
                                value={fields.ContactSource} 
                                handleInputChange={props.handleInputChange} 
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
                            handleInputChange={props.handleInputChange} 
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
                            handleInputChange={props.handleInputChange} 
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
                            validation="\d{6}"
                            value={fields.MotivationText} 
                            handleInputChange={props.handleInputChange} 
                            error={errors.MotivationText} 
                        />
                    </div>
                </fieldset>
                <fieldset styleName="form.fieldset__bordered">
                    <h3>Toggle Form Status</h3>
                    <p styleName="form.form-info">Forms in Testing Status should already have some Form, Email and Style Settings saved, so that a version of the form will render on the draft page. Please use this setting to test donations to the development version of giving services. Do not put a page in Testing status into production since no transactions will be officially recorded. Forms in Production can be edited, but it is recommended that extreme care be taken before updating a form within production. We recommend reverting the giving page to draft status while changes are made on production forms.</p>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">                  
                        <div styleName="flex.flex flex.flex-row flex.flex-between form.form-status-radio">
                            <RadioButton id="new-status" name="status-toggle" label="New" checked={fields.form_status === "new"} handleRadioClick={props.handleRadioClick} disabled={fields.form_status !== "new"}/>
                            <RadioButton id="dev-status" name="status-toggle" label="Testing" checked={fields.form_status === "dev"} handleRadioClick={props.handleRadioClick}/>
                            <RadioButton id="prod-status" name="status-toggle" label="Production" checked={fields.form_status === "prod"} handleRadioClick={props.handleRadioClick}/>
                        </div>
                    </div>
                </fieldset>
                <fieldset styleName="form.fieldset">
                    <div style={{maxWidth: "88px"}}>
                        <SaveButton 
                            handleClick={props.handleButtonClick} 
                            submitting={props.submitting} 
                            ctx={{name: "store", val: '', type: 'form_setup'}} 
                            error={errors.formError} 
                            formMsg={props.updated && !props.saved ? "Changes require saving": ''}
                        />
                    </div>
                </fieldset>
            </form>
        </React.Fragment>
    )
}

export default withFormConfigHandling(FormSettings);