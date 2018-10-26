import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import TextGroup from './TextGroup';

export default class SubscriptionSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit"
        this.state = {
            updated: false,
            saved: false,
            fields: {
                header: editMode ? props.emailConfig.header : '',
                single: editMode ? props.emailConfig.single: '',
                monthly: editMode ? props.emailConfig.monthly: '',
                product: editMode ? props.emailConfig.product: ''
            },
            errors: {
                header: '',
                single: '',
                monthly: '',
                product: ''
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
        const { fields } = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Email Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <TextGroup
                                id="header" 
                                specialStyle=""
                                email={true}  
                                label="Email Header"
                                maxLength={65536}
                                placeholder="HTML tags for your Email Header, to be used with every email from this form. To have unique headers, leave this blank and put individual headers in the following textareas." 
                                required={true} 
                                value={this.state.fields.header} 
                                handleInputChange={this.handleInputChange} 
                                error={this.state.errors.header} 
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
                                required={true} 
                                value={this.state.fields.single} 
                                handleInputChange={this.handleInputChange} 
                                error={this.state.errors.single} 
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
                                required={true} 
                                value={this.state.fields.monthly} 
                                handleInputChange={this.handleInputChange} 
                                error={this.state.errors.monthly} 
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
                                required={true} 
                                value={this.state.fields.product} 
                                handleInputChange={this.handleInputChange} 
                                error={this.state.errors.product} 
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