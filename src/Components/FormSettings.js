import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';

export default class FormSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        this.state = {
            editMode: props.editMode,
            updated: false,
            saved: false,
            initialState: {
                ...props.defaultValues
            },
            fields: {
                thankYouUrl: props.editMode ? props.config.thankYouUrl : '',
                AddContactYN: props.editMode ? props.config.AddContactYN : "Y",
                ContactSource: props.editMode ? props.config.ContactSource : '',
                SectionName: props.editMode ? props.config.SectionName : '',
                ActivityName : props.editMode ? props.config.ActivityName : '',
                MotivationText: props.editMode ? props.config.MotivationText : ''
            },
            errors: {
                thankYouUrl: '',
                AddContactYN: '',
                ContactSource: '',
                SectionName: '',
                ActivityName: '',
                MotivationText: '',
                formError: ''
            },
            currentForm: props.currentForm,
            pageLocation: window.location.origin + '/' + props.currentForm.form_name + '/'
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUnload=this.handleUnload.bind(this)
    }

    // don't let users leave page without warning
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload)
    }
    // remove event listeners on unmount
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload)
    }

    handleUnload(e) {
        // console.log({updated: this.state.updated, saved: this.state.saved})
        if (this.state.updated && !this.state.saved) {
            e.preventDefault();
            e.returnValue = "Are you sure you want to go back?\n You may lose all your changes to this page."
            return "Are you sure you want to go back?\n You may lose all your changes to this page."
        }
        return void (0);
    }

    handleButtonClick(ctx) {
        const fields = {...this.state.fields}, errors = {...this.state.errors}
        this.setState({submitting: true}, ()=>{
            this.props.tabFunctions.toggleBtnEnable( false )
            const currentState = JSON.stringify(fields);
            const initialState = JSON.stringify(this.state.initialState);
            for (let error in errors) {
                // data validation???
                errors[error] = ''
            }
            if (currentState != initialState) {
                const config = {...this.props.config, ...fields};
                this.props.tabFunctions.storeConfig(this.state.currentForm.id, ctx.type, config)
                .then(success=>{
                    if (success) {
                         this.setState({updated: false, saved: true, submitting: false, initialState: fields, errors}, () => {
                            this.props.tabFunctions.toggleBtnEnable( true )
                            setTimeout(() => {
                                this.setState({saved: false})
                            }, 300)
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
                    }, 300)
                })
            }
        });
    }


    handleInputChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === "AddContactYN") {
            value = value ? "Y" : "N"
        } 
        const fields = {...this.state.fields},  errors = {...this.state.errors};
        const error = '';
        errors[name] = error;     
        fields[name] = value;
        const updated = JSON.stringify(fields) !== JSON.stringify(this.state.initialState)
        // console.log({updated, value, initialState: this.state.initialState[name]})
        this.setState({ fields, errors, updated }, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ));
    }
   
    render() {
        const {fields, errors} = this.state;
        return (
            <React.Fragment>
                <form onSubmit={(e)=>{e.preventDefault(); this.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                    <h3>Configure Main Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="form_name" 
                                specialStyle="" 
                                label="Campaign Name/URL Slug" 
                                value={this.state.currentForm.form_name} 
                                disabled={true}
                            />
                        </div>
                        <p styleName="form.form-info">You can now use the Wordpress Shortcode <code styleName="form.form-code">[cbngivingform]</code> on a page at the following url: <a href={this.state.pageLocation} target="_blank">{this.state.pageLocation}</a>.</p>
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
                        <p styleName="form.form-info">This will be the page where the donor is redirected after a successful donation.</p>
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="AddContactYN" checked={fields.AddContactYN === "Y"} handleInputChange={this.handleInputChange} label="Add Contact with Transaction?"/>
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
                            <SaveButton 
                                handleClick={this.handleButtonClick} 
                                submitting={this.state.submitting} 
                                ctx={{name: "store", val: '', type: 'form_setup'}} 
                                error={errors.formError} 
                                formMsg={this.state.updated && !this.state.saved ? "Changes require saving": ''}
                            />
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}