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
        this.setState({fields})
    }

    handleButtonClick(ctx) {
        let fields = {...this.state.fields}, errors = {...this.state.errors}
        if (ctx.type === "Add") {
            const fieldName = `num${ctx.name}`
            fields[fieldName] = fields[fieldName] + 1;
            const newObj = getNewObj(ctx.name)
            fields[ctx.name].push(newObj)
            errors[ctx.name].push(newObj)
            this.setState({fields, errors})
        } else if (ctx.type === "Remove") {
            const fieldName = `num${ctx.name}`
            fields[fieldName] = fields[fieldName] - 1;
            fields[ctx.name] = [...fields[ctx.name].slice(0, ctx.val), ...fields[ctx.name].slice(ctx.val + 1)]
            errors[ctx.name] = [...errors[ctx.name].slice(0, ctx.val), ...errors[ctx.name].slice(ctx.val + 1)]
            this.setState({fields, errors})
        } else {
            this.setState({submitting: true}, ()=>{
                this.props.tabFunctions.toggleBtnEnable( false )
                const currentState = JSON.stringify(fields);
                const initialState = JSON.stringify(this.state.initialState);
                for (let error in errors) {
                    // data validation???
                    errors[error] = ''
                }
                if (currentState != initialState) {
                    if (this.props.displayMode.toLowerCase() === "giving") {
                        const {numMonthlyAmounts, numSingleAmounts} = fields;
                        delete fields.numMonthlyAmounts
                        delete fields.numSingleAmounts
                    }
                    const config = {...this.props.config, ...fields};
                    this.props.tabFunctions.storeConfig(this.state.currentForm.id, ctx.type, config)
                    .then(success=>{
                        if (success) {
                            if (this.props.displayMode.toLowerCase() === "giving") {
                                fields["numMonthlyAmounts"] = numMonthlyAmounts
                                fields["numSingleAmounts"] = numSingleAmounts
                            }
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
    }

    handleInputChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        const fields = {...this.state.fields},  errors = {...this.state.errors};
        const error = '';
        if (name.includes("funds-") || name.includes("products-") || name.includes("subscriptions-")) {
            const field = name.split("-")[0]
            const index = name.split("-")[1]
            const setting = name.split("-")[2]
            fields[field][index][setting] = value;
            errors[field][index][setting] = '';
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