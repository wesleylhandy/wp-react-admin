import React, {Component} from 'react'

import {getNewObj} from './helpers/getNewObj'
import swal from 'sweetalert'

async function clickAlert() {
    const willEdit = await swal({
        title: "Are you ready for production?",
        text: 'Setting your form to production means you have tested the fields and submission process of your form, verified entire form submission process, and approved final copy for you thank you email and thank you page. Pages in production will submit to the production database.',
        icon: "warning",
        buttons: true,
        dangerMode: true
    })

    if (willEdit) {
        return true
    } else {
        return false
    }
}

const withFormConfigHandling = SettingsComponent => class extends Component {
    constructor(props) {
        super(props);
        // console.log({props: props.defaultValues.fields});
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
        this.handleBlur = this.handleBlur.bind(this)
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
            if (id === "prod-status") {
                clickAlert().then(update=>{
                    fields.form_status = update ? ids[id] : fields.form_status
                })
            } else {
                fields.form_status = ids[id]
            }
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
       
        if (type === "Add") {
            let newObj;
            switch (name) {
                case "subscriptions":
                    // just need a new empty object
                    newObj = getNewObj(name)
                    fields[name].push({...newObj})
                    errors[name].push({...newObj})
                    break;
                case "giving":
                    //have to update array of amounts as well as add errors and fields
                    const amounts = [...fields[`${val}Amounts`]]
                    amounts.push(1)
                    amounts.sort((a,b)=>a - b);
                    const len = amounts.length;
                    for (let i = 0; i < len; i++) {
                        fields[val + "Amt-" + i] = amounts[i]
                        errors[val + "Amt-" + i] = '';
                    }
                    fields[`${val}Amounts`] = [...amounts]             
                    break;
                default:
                    //have to increase record of num of fields as well as add empty object
                    const numFields = `num${name.substring(0, 1).toUpperCase() + name.substring(1)}`
                    fields[numFields] = +fields[numFields] + 1;
                    newObj = getNewObj(name)
                    fields[name].push({...newObj})
                    errors[name].push({...newObj})
                    break;
            }   
            // console.log({fields, errors})
            let currentState = JSON.stringify(fields);
            this.setState(() => {
                return {fields, errors, updated: currentState != initialState}
            })
        } else if (type === "Remove") {
            if (name !== "subscriptions" && name !== "giving") {
                fields[numFields] = +fields[numFields] - 1;
            }
            if (name !== "giving") {
                fields[name] = [...fields[name].slice(0, val), ...fields[name].slice(val + 1)]
                errors[name] = [...errors[name].slice(0, val), ...errors[name].slice(val + 1)]
            } else {
                const amounts = [...fields[`${val.type}Amounts`]]
                const newAmts = [...amounts.slice(0, val.ind), ...amounts.slice(val.ind + 1)]
                newAmts.sort((a,b)=>a - b);
                delete fields[`${val.type}Amt-${val.ind}`]
                fields[`${val.type}Amounts`] = newAmts;
                const len = amounts.length;
                for (let i = 0; i < len; i++) {
                    fields[val.type + "Amt-" + i] = newAmts[i]
                    errors[val.type + "Amt-" + i] = '';
                }
            }
            // console.log({newList: fields[name], newErrors: errors[name]}) 
            let currentState = JSON.stringify(fields);
            this.setState(() => {
                return {fields, errors, updated: currentState != initialState}
            })
        } else {
            this.setState({submitting: true}, ()=>{
                this.props.tabFunctions.toggleBtnEnable( false )
                if (this.props.displayMode.toLowerCase() === "giving") {
                    let fieldKeys = Object.keys(fields);
                    const monthlyKeys = fieldKeys.filter(el=> el.includes("monthlyAmt"))
                    const singleKeys = fieldsKeys.filter(el=> el.includes("singleAmt"))
                    fields.monthlyAmounts = monthlyKeys.map(k=>fields[k])
                    fields.singleAmounts = singleKeys.map(k=>fields[k])
                }
                const config = {...this.props.config, ...fields};
                this.props.tabFunctions.storeConfig(this.state.currentForm.id, type, config)
                .then(success=>{
                    // console.log({success})
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
            const ind = +(name.split("-")[1])
            const setting = name.split("-")[2]
            // console.log({field, ind, setting, value})

            fields[field][ind][setting] = value;
            errors[field][ind][setting] = '';
            
            // console.log({fields, fieldUpdated: fields[field][ind][setting]})
        } else if (name === "AddContactYN") {
            fields[name] = value === true ? "Y" : "N";
            errors[name] = error; 
        } else if (name.includes("Amt-")) {
            const type = name.split("-")[0].substring(0, name.split("-")[0].length - 3);
            const ind = +(name.split("-")[1])
            const amounts = [...fields[`${type}Amounts`]]
            amounts[ind] = value;
            amounts.sort((a,b)=>a - b);
            fields[`${type}Amounts`] = amounts;
            const len = amounts.length;
            for (let i = 0; i < len; i++) {
                fields[type + "Amt-" + i] = amounts[i]
                errors[type + "Amt-" + i] = '';
            }
        } else {
            errors[name] = error;     
            fields[name] = value;
        }
        const updated = JSON.stringify(fields) !== JSON.stringify(this.state.initialState)
        // console.log({updated, value, initialState: this.state.initialState[name]})
        this.setState({ fields, errors, updated }, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ));
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
            handleBlur={this.handleBlur}
        />
    }
}

export default withFormConfigHandling;