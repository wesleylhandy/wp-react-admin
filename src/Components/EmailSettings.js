import React, {Fragment} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import InputGroup from './InputGroup';
import TextGroup from './TextGroup';
import SaveButton from './SaveButton';
import PreviewButton from './PreviewButton'
import withFormConfigHandling from './withFormConfigHandling'

const EmailSettings = ({fields, errors, handleButtonClick, handleBlur, handleInputChange, handleMarkdownInput, submitting, updated, saved}) => {
    return (
        <Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); handleButtonClick({name: "store", val: '', type: 'email_setup'})}}>
                <h3>Configure Email Setttings</h3>
                <p styleName="form.form-info">The Server generates confirmation emails by looking at the type of donations that the user makes. Depending on the form, donors can give monthly, make single gifts or order products, or some combination thereof. Monthly gifts are prioritized over Products over Single Gifts. The server will take the values within the header and concatenate with the appropriate values afterward. This means, you can send the same email to all types by only configuring the email header. Or, you can have a single, consistent header and you can send unique emails to the various donation types. In the fields below, you can enter any valid HTML/CSS appropriate for an Email or use Markdown, starting with an opening <code styleName="form.form-code">{"<body>"}</code> tag.</p>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id="EmailSubjectLine" 
                            specialStyle="" 
                            label="Email Subject Line" 
                            value={fields.EmailSubjectLine} 
                            placeholder="i.e. Thank You For Your Contribution" 
                            maxLength="200" 
                            required={false} 
                            error={errors.EmailSubjectLine}
                            handleInputChange={handleInputChange} 
                        />
                    </div>
                    <h3>Configure Email Components</h3>
                    <p styleName="form.form-info">The Following Inputs will allow you to use valid Markdown or HTML to style your email responses. Markdown will be automatically converted to HTML. For how to use Markdown, see <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">this link.</a> You can use any publically available images. Please include the full address of any images you use.</p>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="header" 
                            specialStyle=""
                            email={true}  
                            label="Email Header"
                            maxLength={65536}
                            placeholder="![Uniquely Designed Header Image](https://path/to/your/image/header.jpg)" 
                            required={false} 
                            value={fields.headerMarkdown} 
                            handleInputChange={handleMarkdownInput} 
                            error={errors.header}
                            handleBlur={handleBlur} 
                        />
                         <PreviewButton field={fields.header} title="Common Email Header and/or Body" className={form.fullWidth}/>
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="single" 
                            specialStyle=""
                            email={true} 
                            label="Email Body in Response to One-Time Donations"
                            maxLength={65536}
                            placeholder="Markdown/HTML tags for the main text/images/content of your email response" 
                            required={false} 
                            value={fields.singleMarkdown} 
                            handleInputChange={handleMarkdownInput} 
                            error={errors.single} 
                            handleBlur={handleBlur} 
                        />
                        <PreviewButton field={fields.single} title="Single Donations Email Body" className={form.fullWidth}/>
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="monthly" 
                            specialStyle=""
                            email={true}  
                            label="Email Body in Response to Monthly Donations"
                            maxLength={65536}
                            placeholder="Markdown/HTML tags for the main text/images/content of your email response" 
                            required={false} 
                            value={fields.monthlyMarkdown} 
                            handleInputChange={handleMarkdownInput} 
                            error={errors.monthly} 
                            handleBlur={handleBlur} 
                        />
                        <PreviewButton field={fields.monthly} title="Monthly Pledges Email Body" className={form.fullWidth}/>
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <TextGroup
                            id="product" 
                            specialStyle=""
                            email={true} 
                            label="Email Body in Response to Product Orders"
                            maxLength={65536}
                            placeholder="Markdown/HTML tags for the main text/images/content of your email response" 
                            required={false} 
                            value={fields.productMarkdown} 
                            handleInputChange={handleMarkdownInput} 
                            error={errors.product} 
                            handleBlur={handleBlur} 
                        />
                        <PreviewButton field={fields.product} title="Product Orders Email Body" className={form.fullWidth}/>
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