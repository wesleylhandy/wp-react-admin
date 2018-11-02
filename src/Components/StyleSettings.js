import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import FormButton from './FormButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';

import {getFontInfo} from './helpers/getFontInfo'

export default class ColorSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        this.state = {
            editMode: props.editMode,
            submitting: false,
            updated: false,
            saved: false,
            initialState : {
                ...props.defaultValues
            },
            fields: {
                ...props.defaultValues
            },
            errors: {
                "formError": props.editMode ? "" : "Above Values Are Not Stored in the DB"
            },
            currentForm: props.currentForm   
        }
        // initialize errors
        for (let defaultValue in props.defaultValues) {
            this.state.errors[defaultValue] = ''
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderInputs = this.renderInputs.bind(this)
    }
    // update state only if new default values, otherwise, let class functions manage state
    static getDerivedStateFromProps(props, state) {
        const updateDefaults = JSON.stringify(props.defaultValues) !== JSON.stringify(state.defaultValues)
        if (updateDefaults) {
            const errors = { formError: props.editMode ? "" : "Above Values Are Not Stored in the DB" }
            for (let defaultValue in props.defaultValues) {
                errors[defaultValue] = ''
            }
            return { 
                editMode: props.editMode,
                submitting: false,
                updated: false,
                saved: false,
                currentForm: props.currentForm,
                initialState: {...props.defaultValues}, 
                fields: {...props.defaultValues},
                errors
            }
        } else {
            return {}
        }
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

    handleButtonClick(e, ctx) {
        const fields = {...this.state.fields}, errors = {...this.state.errors}
        if (ctx.name === "externalFonts") {
            const {count} = getFontInfo(true, "externalFont", fields)
            fields[`externalFont${count}`] = '', errors[`externalFont${count}`] = ''
            this.setState({fields, errors});
        } else {
            this.setState({submitting: true}, ()=>{
                this.props.tabFunctions.toggleBtnEnable( false )
                const currentState = JSON.stringify(fields);
                const initialState = JSON.stringify(this.state.initialState);
                for (error in errors) {
                    errors[error] = ''
                }
                if (currentState != initialState) {
                    const config = {...this.props.config, ...this.state.fields};
                    this.props.tabFunctions.storeConfig(e, this.state.currentForm.id, ctx.type, config)
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
        const fieldNames = Object.keys(fields);
        const groups = fieldNames.reduce((acc, name) => {
            const fieldGroup = name.substring(2).split("-")[0];
            if ( !acc[fieldGroup] ) {
                acc[fieldGroup] = [name]
            } else {
                acc[fieldGroup].push(name)
            }
            return acc
        }, {})
        const returnArray = [];
        for ( let group in groups) {
            returnArray.push(groups[group].map((field, ind)=>{
                return (
                    <div key={`${group}-${ind}`} styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={field}
                            specialStyle="" 
                            label={field.substring(2)}
                            placeholder="CSS"
                            maxLength={32} 
                            required={true} 
                            value={this.state.fields[field]} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors[field]} 
                        />
                        { 
                            this.props.displayMode === "Colors" ? (
                                <div style={{border: "1px solid #ccc", height: "28px", width: "28px", backgroundColor: fields[field]}}></div>
                            ) : null
                        }
                    </div>
                )
            }));
        }
        return returnArray.map((arr, i)=>{
            return (
                <fieldset key={`groups-${i}`} styleName='form.fieldset__bordered'>
                    {arr}
                </fieldset>
            )
        })
    }
   
    render() {
        const { fields, errors } = this.state;
        let title = this.props.displayMode == "Spacing" ? "Spacing" : this.props.displayMode.slice(0, -1);
        return (
            <React.Fragment>
                <form>
                    <h3>Configure {title} Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        {this.renderInputs(fields)}
                        {
                            this.props.displayMode === "Fonts" ? (
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <div style={{maxWidth: "225px"}}>
                                        <FormButton val="Add External Font" handleClick={this.handleButtonClick} ctx={{name: "externalFonts", val: '', type: 'Add'}} />
                                    </div>
                                </div>
                            ) : null
                        }
                    </fieldset>

                    <SaveButton 
                        handleClick={this.handleButtonClick} 
                        submitting={this.state.submitting} 
                        ctx={{name: "store", val: '', type: 'css_setup'}} 
                        error={errors.formError} 
                        formMsg={this.state.formMsg}
                    />
                 </form>
            </React.Fragment>
        )
    }
}