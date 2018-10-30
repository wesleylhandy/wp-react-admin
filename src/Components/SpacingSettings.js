import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';

export default class SpacingSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
        this.state = {
            submitting: false,
            updated: false,
            saved: false,
            initialState: {
                "--form-border-radius": editMode ? props.cssConfig["--form-border-radius"]: "20px",
                "--form-border-width": editMode ? props.cssConfig["--form-border-width"]: '2px',
                "--form-padding": editMode ? props.cssConfig["--form-padding"] : '0',
                "--panel-border-radius": editMode ? props.cssConfig["--panel-border-radius"]: "0",
                "--panel-border-width": editMode ? props.cssConfig["--panel-border-width"]: '0',
                "--panel-padding": editMode ? props.cssConfig["--panel-padding"]: '10px',
                "--panel-space-between": editMode ? props.cssConfig["--panel-space-between"]: "20px"
            },
            fields: {
                "--form-border-radius": editMode ? props.cssConfig["--form-border-radius"]: "20px",
                "--form-border-width": editMode ? props.cssConfig["--form-border-width"]: '2px',
                "--form-padding": editMode ? props.cssConfig["--form-padding"] : '0',
                "--panel-border-radius": editMode ? props.cssConfig["--panel-border-radius"]: "0",
                "--panel-border-width": editMode ? props.cssConfig["--panel-border-width"]: '0',
                "--panel-padding": editMode ? props.cssConfig["--panel-padding"]: '10px',
                "--panel-space-between": editMode ? props.cssConfig["--panel-space-between"]: "20px"
            },
            errors: {
                "--form-padding": "",
                "--form-border-radius": "",
                "--form-border-width": "",
                "--panel-padding": "",
                "--panel-border-radius": "",
                "--panel-border-width": "",
                "--panel-space-between": "",
                formError: ""
            },
            currentForm: props.currentForm      
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderInputs = this.renderInputs.bind(this)
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload)
    }

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

    handleButtonClick(e, ctx) {
        this.setState({submitting: true}, ()=>{
            this.props.tabFunctions.toggleBtnEnable( false )
            const fields = JSON.stringify(this.state.fields);
            const initialState = JSON.stringify(this.state.initialState);
            const errors = {...this.state.errors};
            for (error in errors) {
                errors[error] = ''
            }
            if (fields != initialState) {
                const cssConfig = {...this.props.cssConfig, ...this.state.fields};
                this.props.tabFunctions.storeConfig(e, this.state.currentForm.id, "cssConfig", cssConfig)
                .then(success=>{
                    if (success) {
                        this.setState({updated: false, saved: true, submitting: false, initialState: JSON.parse(fields), errors}, () => {
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
        this.setState({ fields, errors, updated }, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ));
    }

    renderInputs(fields) {
        const feildNames = Object.keys(fields);
        return feildNames.map((field, ind)=>{
            return (
                <div key={`field-${ind}`} styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                    <InputGroup
                        type="text"
                        id={field}
                        specialStyle="" 
                        label={field.substring(2)}
                        placeholder="CSS"
                        maxLength={32} 
                        required={true} 
                        value={fields[field]} 
                        handleInputChange={this.handleInputChange} 
                        error={this.state.errors[field]} 
                    />
                </div>
            )
        })
    }
   
    render() {
        const {fields, errors} = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Spacing Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        {
                            this.renderInputs(fields)
                        }
                    </fieldset>
                    <SaveButton 
                        handleClick={this.handleButtonClick} 
                        submitting={this.state.submitting} 
                        ctx={{name: "store", val: '', type: 'cssConfig'}} 
                        error={errors.formError} 
                        formMsg={this.state.formMsg}
                    />
                </form>
            </React.Fragment>
        )
    }
}