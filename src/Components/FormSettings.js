import React, {Fragment} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';
import RadioButton from './RadioButton';
import withFormConfigHandling from './withFormConfigHandling'

const FormSettings = props => {
    const {fields, errors} = props;
    return (
        <Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); props.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Main Setttings</h3>
                <p styleName="form.form-info" style={{color: "crimson"}}>Note: Each of these tabs load default settings on this page, but you must click SAVE on each tab to store your configuration in the database. If you do not save on each tab, your form will not function properly. Also, please configure all your settings, at least saving the default values, before changing the Form Status from New to Development/Testing.</p>
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
                        fields.AddContactYN === "Y" && (
                            <Fragment>
                                <InputGroup
                                    type="text"
                                    id="ContactSource" 
                                    specialStyle="" 
                                    label="Contact Source" 
                                    placeholder={`i.e. ${ props.currentForm.form_name }`}
                                    maxLength="20" 
                                    required={true} 
                                    value={fields.ContactSource} 
                                    handleInputChange={props.handleInputChange} 
                                    error={errors.ContactSource} 
                                />
                                <p styleName="form.form-info">This is generally the same as the campaign name, or <code styleName="form.form-code">{props.currentForm.form_name}</code>.</p>
                            </Fragment>
                        ) 
                    }
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id="SectionName" 
                            specialStyle="" 
                            label="Giving Classification (Section Name)" 
                            placeholder="i.e. 700Club, General, Special, etc" 
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
                            placeholder={`i.e. ${ props.currentForm.form_name }-donation-activity`} 
                            maxLength="50" 
                            required={true} 
                            value={fields.ActivityName} 
                            handleInputChange={props.handleInputChange} 
                            error={errors.ActivityName} 
                        />
                    </div>
                    <p styleName="form.form-info">This is generally connected to the campaign name, or <code styleName="form.form-code">{props.currentForm.form_name}-donation-activity</code>.</p>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="showSeals" checked={fields.showSeals} handleInputChange={props.handleInputChange} label="Show CBN Giving Seals - Digicert & ECFA?"/>
                    </div>
                    <p styleName="form.form-info">If your site has it&rsquo;s own set of security and giving seals, leave then unchecked.</p>
                </fieldset>
                <fieldset styleName="form.fieldset__bordered">
                    <h3>Toggle Form Status</h3>
                    <p styleName="form.form-info">Forms in Development/Testing Status should already have at least default Form, Email and Style Settings saved, so that a version of the form will render on the draft page. Once you put into Development/Testing, you will see a new tab in the menu to "Preview" the form. This will allow you to view the form, with the options you selected plus the styles you stored. However, to test the form, create a Draft page, add the correct shortcode on that page, and test from that page. Forms in Development/Testing submit donations to the development version of giving services, meaning no transactions will be officially recorded. Forms in Production can be edited, but it is recommended that extreme care be taken before updating a form within production. We recommend reverting the giving page to draft status while changes are made on production forms.</p>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">                  
                        <div styleName="flex.flex flex.flex-row flex.flex-between form.form-status-radio">
                            <RadioButton id="new-status" name="status-toggle" label="New" checked={fields.form_status === "new"} handleRadioClick={props.handleRadioClick} disabled={fields.form_status !== "new"}/>
                            <RadioButton id="dev-status" name="status-toggle" label="Development/Testing" checked={fields.form_status === "dev"} handleRadioClick={props.handleRadioClick}/>
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
        </Fragment>
    )
}

export default withFormConfigHandling(FormSettings);