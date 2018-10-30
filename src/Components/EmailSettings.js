import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import TextGroup from './TextGroup';
import SaveButton from './SaveButton';

export default class SubscriptionSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
        this.state = {
            submitting: false,
            updated: false,
            saved: false,
            initialState: {
                header: editMode ? props.emailConfig.header : '',
                single: editMode ? props.emailConfig.single: '',
                monthly: editMode ? props.emailConfig.monthly: '',
                product: editMode ? props.emailConfig.product: ''
            },
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
                product: '',
                formError: '',
            },
            formMsg: '',
            currentForm: props.currentForm
        }

        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUnload = this.handleUnload.bind(this)
        this.handleBlur = this.handleBlur.bind(this)

    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload)
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload)
    }

    handleButtonClick(e, ctx) {
        this.setState({submitting: true}, ()=>{
            this.props.tabFunctions.toggleBtnEnable( false )
            const emailConfig = JSON.stringify(this.state.fields);
            const initialState = JSON.stringify(this.state.initialState);
            const errors = {...this.state.errors};
            for (error in errors) {
                errors[error] = ''
            }
            if (emailConfig != initialState) {
                this.props.tabFunctions.storeConfig(e, this.state.currentForm.id, "cssConfig", emailConfig)
                .then(success=>{
                    if (success) {
                        this.setState({updated: false, saved: true, submitting: false, formMsg: "Saved.", initialState: JSON.parse(emailConfig), errors}, () => {
                            this.props.tabFunctions.toggleBtnEnable( true )
                            setTimeout(() => {
                                this.setState({saved: false})
                            }, 3000)
                        })
                    } else {
                        errors['formError'] = "Unable to Save"
                        this.setState({errors})
                    }
                });
            } else {
                this.setState({updated: false, saved: true, errors, submitting: false}, () => {
                    this.props.tabFunctions.toggleBtnEnable( true )
                    setTimeout(() => {
                        this.setState({saved: false})
                    }, 3000)
                })
            }
            
        });

    }

    handleBlur(e) {
        const name = e.target.name;
        const errors = {...this.state.errors};
        if (this.state.updated && !this.state.saved) {
            errors[name] = "Be Sure to Save Your Changes"  
        } else {
            errors[name] = ""
        }
        this.setState({errors})
    }

    handleInputChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const fields = {...this.state.fields},  errors = {...this.state.errors};
        const error = '';
        errors[name] = error;     
        fields[name] = value;
        const updated = value !== this.state.initialState[name]
        // console.log({updated, value, initialState: this.state.initialState[name]})
        this.setState({ fields, errors, updated, formMsg: updated ? "You have unsaved data" : "" }, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ));
    }

    handleUnload(e) {
        console.log({updated: this.state.updated, saved: this.state.saved})
        if (this.state.updated && !this.state.saved) {
            e.preventDefault();
            e.returnValue = "Are you sure you want to go back?\n You may lose all your changes to this page."
            return "Are you sure you want to go back?\n You may lose all your changes to this page."
        }
        return void (0);
    }

 
    render() {
        const { fields, errors } = this.state;
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
                                value={fields.header} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.header}
                                handleBlur={this.handleBlur} 
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
                                value={fields.single} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.single} 
                                handleBlur={this.handleBlur} 
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
                                value={fields.monthly} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.monthly} 
                                handleBlur={this.handleBlur} 
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
                                value={fields.product} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.product} 
                                handleBlur={this.handleBlur} 
                            />
                        </div>
                    </fieldset>

                    <SaveButton handleClick={this.handleButtonClick} submitting={this.state.submitting} ctx={{name: "store", val: '', type: 'emailConfig'}} error={errors.formError} formMsg={this.state.formMsg}/>

                </form>
            </React.Fragment>

        )
    }
}