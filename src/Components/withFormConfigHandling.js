import React, {Component} from 'react'

import {getNewObj} from './helpers/getNewObj'

const withFormConfigHandling = SettingsComponent => class extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        this.state = {
            updated: false,
            saved: false,
            initialState: {
                ...props.defaultValues.fields
            },
            fields: {
                ...props.defaultValues.fields
            },
            errors: {
                ...props.defaultValues.errors
            },
            currentForm: props.currentForm
        }
        this.handleRadioClick = this.handleRadioClick.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUnload = this.handleUnload.bind(this)
    }
    
    static get name() {
        return Component.name;
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

    handleRadioClick(e) {
        const {id} = e.target;
        const fields = {...this.state.fields}
        const ids = {
            "new-status": "new",
            "dev-status": "dev",
            "prod-status": "prod",
            "monthlygift": "monthly",
            "singlegift": "single",
            "nullgift": "null"
        }
        if (this.props.displayMode.toLowerCase() === "giving") {
            fields.defaultOption = ids[id]
        } else {
            fields.form_status = ids[id]
        }
        const initialState = JSON.stringify(this.state.initialState);
        const currentState = JSON.stringify(fields);
        this.setState(() => {
            return {fields, updated: currentState != initialState}
        })
    }

    handleButtonClick(ctx) {
        let fields = {...this.state.fields}, errors = {...this.state.errors}
        const initialState = JSON.stringify(this.state.initialState);
        const {name, type, val} = ctx;
        const numFields = `num${name.substring(0, 1).toUpperCase() + name.substring(1)}`
        if (type === "Add") {    
            if (name !== "subscriptions") {
                fields[numFields] = +fields[numFields] + 1;
            }
            const newObj = getNewObj(name)
            fields[name].push({...newObj})
            errors[name].push({...newObj})
            // console.log({fields, errors})
            let currentState = JSON.stringify(fields);
            this.setState(() => {
                return {fields, errors, updated: currentState != initialState}
            })
        } else if (type === "Remove") {
            if (name !== "subscriptions") {
                fields[numFields] = +fields[numFields] - 1;
            }
            fields[name] = [...fields[name].slice(0, val), ...fields[name].slice(val + 1)]
            errors[name] = [...errors[name].slice(0, val), ...errors[name].slice(val + 1)]
            // console.log({newList: fields[name], newErrors: errors[name]}) 
            let currentState = JSON.stringify(fields);
            this.setState(() => {
                return {fields, errors, updated: currentState != initialState}
            })
        } else {
            this.setState({submitting: true}, ()=>{
                this.props.tabFunctions.toggleBtnEnable( false )
                if (this.props.displayMode.toLowerCase() === "giving") {
                    const {numMonthlyAmounts, numSingleAmounts} = fields;
                    delete fields.numMonthlyAmounts
                    delete fields.numSingleAmounts
                }
                const config = {...this.props.config, ...fields};
                this.props.tabFunctions.storeConfig(this.state.currentForm.id, type, config)
                .then(success=>{
                    console.log({success})
                    this.props.tabFunctions.toggleBtnEnable( true )
                    this.setState({saved: false, updated: false, submitting: false, errors: {...this.props.defaultValues.errors}})
                })
                .catch(err=>{
                    console.error(err)
                    errors['formError'] = "Unable to Save"
                    this.setState({errors, submitting: false}, () => {
                        this.props.tabFunctions.toggleBtnEnable( true )
                        setTimeout(() => {
                            this.setState({saved: false})
                        }, 300)
                    })
                });
            });
        }
    }

    handleInputChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        const fields = {...this.state.fields},  errors = {...this.state.errors};
        const error = '';
        if (name.includes("funds-") || name.includes("products-") || name.includes("subscriptions-")) {
            const field = name.split("-")[0]
            const ind = +name.split("-")[1]
            const setting = name.split("-")[2]
            console.log({field, ind, setting, value})

            fields[field][ind][setting] = value;
            errors[field][ind][setting] = '';
            
            console.log({fields, fieldUpdated: fields[field][ind][setting]})
        } else {
            errors[name] = error;     
            fields[name] = value;
        }
        const updated = JSON.stringify(fields) !== JSON.stringify(this.state.initialState)
        // console.log({updated, value, initialState: this.state.initialState[name]})
        this.setState({ fields, errors, updated }, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ));
    }

    render() {
        return <SettingsComponent 
            {...this.props}
            saved={this.state.saved}
            updated={this.state.updated}
            fields={this.state.fields}
            errors={this.state.errors}
            currentForm={this.state.currentForm}
            handleInputChange={this.handleInputChange}
            handleButtonClick={this.handleButtonClick}
            handleRadioClick={this.handleRadioClick}
        />
    }
}

export default withFormConfigHandling;