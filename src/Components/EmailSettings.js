import React, {Fragment} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import TextGroup from './TextGroup';
import SaveButton from './SaveButton';
import withFormConfigHandling from './withFormConfigHandling'

const EmailSettings = ({fields, errors, handleButtonClick, handleBlur, handleInputChange, submitting, updated, saved}) => {
        
    return (
        <Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); handleButtonClick({name: "store", val: '', type: 'email_setup'})}}>
                <h3>Configure Email Setttings</h3>
                <p styleName="form.form-info">The Server generates confirmation emails by looking at the type of donations that the user makes. Depending on the form, donors can give monthly, make single gifts or order products, or some combination thereof. Monthly gifts are prioritized over Products over Single Gifts. The server will take the values within the header and concatenate with the appropriate values afterward. This means, you can send the same email to all types by only configuring the email header. Or, you can have a single, consistent header and you can send unique emails to the various donation types. In the fields below, you can enter any valid HTML/CSS appropriate for an Email, starting with an opening <code styleName="form.form-code">{"<body>"}</code> tag.</p>
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
                            handleInputChange={handleInputChange} 
                            error={errors.header}
                            handleBlur={handleBlur} 
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
                            handleInputChange={handleInputChange} 
                            error={errors.single} 
                            handleBlur={handleBlur} 
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
                            handleInputChange={handleInputChange} 
                            error={errors.monthly} 
                            handleBlur={handleBlur} 
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
                            handleInputChange={handleInputChange} 
                            error={errors.product} 
                            handleBlur={handleBlur} 
                        />
                    </div>
                </fieldset>

                <SaveButton 
                    handleClick={handleButtonClick} 
                    submitting={submitting} 
                    ctx={{name: "store", val: '', type: 'email_setup'}} 
                    error={errors.formError} 
                    formMsg={updated && !saved ? "Changes require saving": ''}
                />
            </form>
        </Fragment>

    )
}

export default withFormConfigHandling(EmailSettings);