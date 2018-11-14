import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import Checkbox from './Checkbox';
import withFormConfigHandling from './withFormConfigHandling'

const NameSettings = props => {
    
    const { fields, errors } = props;
    return (
        <React.Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); props.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Name/Address Setttings</h3>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="getMiddleName" checked={fields.getMiddleName} handleInputChange={props.handleInputChange} label="Get Donor's Middle Name?"/>
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="getSuffix" checked={fields.getSuffix} handleInputChange={props.handleInputChange} label="Get Donor's Suffix Information, i.e. Jr, Sr, etc...?"/>
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="getSpouseInfo" checked={fields.getSpouseInfo} handleInputChange={props.handleInputChange} label="Get Donor's Spouse First and Last name?"/>
                    </div>
                </fieldset>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="getPhone" checked={fields.getPhone} handleInputChange={props.handleInputChange} label="Ask for Phone Number?"/>
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="international" checked={fields.international} handleInputChange={props.handleInputChange} label="Allow International Addresses?"/>
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="shipping" checked={fields.shipping} handleInputChange={props.handleInputChange} label="Allow Separate Shipping Addresses?"/>
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

export default withFormConfigHandling(NameSettings);