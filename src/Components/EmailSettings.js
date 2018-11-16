import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import TextGroup from './TextGroup';
import SaveButton from './SaveButton';
import withFormConfigHandling from './withFormConfigHandling'

const EmailSettings = props => {

    const { fields, errors } = props;
        
    return (
        <React.Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); props.handleButtonClick({name: "store", val: '', type: 'email_setup'})}}>
                <h3>Configure Email Setttings</h3>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="header" 
                            specialStyle=""
                            email={true}  
                            label="Email Header"
                            maxLength={65536}
                            placeholder="HTML tags for your Email Header, to be used with every email from props form. To have unique headers, leave props blank and put individual headers in the following textareas." 
                            required={false} 
                            value={fields.header} 
                            handleInputChange={props.handleInputChange} 
                            error={errors.header}
                            handleBlur={props.handleBlur} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="single" 
                            specialStyle=""
                            email={true} 
                            label="Email Body in Response to One-Time Donations"
                            maxLength={65536}
                            placeholder="HTML tags for the main text/images/content of your email response" 
                            required={false} 
                            value={fields.single} 
                            handleInputChange={props.handleInputChange} 
                            error={errors.single} 
                            handleBlur={props.handleBlur} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="monthly" 
                            specialStyle=""
                            email={true}  
                            label="Email Body in Response to Monthly Donations"
                            maxLength={65536}
                            placeholder="HTML tags for the main text/images/content of your email response" 
                            required={false} 
                            value={fields.monthly} 
                            handleInputChange={props.handleInputChange} 
                            error={errors.monthly} 
                            handleBlur={props.handleBlur} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="product" 
                            specialStyle=""
                            email={true} 
                            label="Email Body in Response to Product Orders"
                            maxLength={65536}
                            placeholder="HTML tags for the main text/images/content of your email response" 
                            required={false} 
                            value={fields.product} 
                            handleInputChange={props.handleInputChange} 
                            error={errors.product} 
                            handleBlur={props.handleBlur} 
                        />
                    </div>
                </fieldset>

                <SaveButton 
                    handleClick={props.handleButtonClick} 
                    submitting={props.submitting} 
                    ctx={{name: "store", val: '', type: 'email_setup'}} 
                    error={errors.formError} 
                    formMsg={props.updated && !props.saved ? "Changes require saving": ''}
                />
            </form>
        </React.Fragment>

    )
}

export default withFormConfigHandling(EmailSettings);