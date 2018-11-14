import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';
import TextGroup from './TextGroup';


export default class FundSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: props.editMode,
            updated: false,
            saved: false,
            initialState: {
                ...props.defaultValues.funds
            },
            fields: {
                addFunds: props.editMode ? props.config.numFunds > 0 : false,
                numFunds: props.editMode ? props.config.numFunds : 0,
                funds: props.editMode ? [...props.config.funds] : []
            },
            errors: {
                ...props.defaultValues.errors
            }
        }
        
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFundInput = this.handleFundInput.bind(this)
        this.renderFundInputs = this.renderFundInputs.bind(this)
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
        let name = target.name;
        const fields = {...this.state.fields},  errors = {...this.state.errors};
        const error = '';
        if (name.includes("funds-")) {
            const index = name.split("-")[1]
            const setting = name.split("-")[3]
            fields.funds[index][setting] = value;
            errors.funds[index][setting] = '';
        } else {
            errors[name] = error;     
            fields[name] = value;
        }
        const updated = JSON.stringify(fields) !== JSON.stringify(this.state.initialState)
        // console.log({updated, value, initialState: this.state.initialState[name]})
        this.setState({ fields, errors, updated }, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ));
    }

    renderFundInputs(num) {
        const arr = Array(num).fill(null);
        return arr.map((el, ind)=>{
            return (
                <fieldset key={`fundRow-${ind}`} styleName='form.fieldset__bordered'>
                    <h4>Fund {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-Title`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Title`}
                            maxLength={120}
                            placeholder="i.e. Wherever Needed Most" 
                            required={true} 
                            value={this.state.fields.funds[ind].Title} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].Title} 
                        />
                        <TextGroup
                            id={`funds-${ind}-FundDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Description`}
                            rows={3}
                            maxLength={512}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={true} 
                            value={this.state.fields.funds[ind].FundDescription} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].FundDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Detail Name`}
                            maxLength={32}
                            placeholder="i.e. Superbook, OrphansPromise, 700Club, etc" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailName} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailName} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: WhiteMail SOL`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailCprojMail} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailCprojMail} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Credit SOL`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailCprojCredit} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailCprojCredit} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: SOL Description`}
                            maxLength={32}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailDescription} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailDescription} 
                        />
                    </div>
                </fieldset>
            )
        })
    }

     
    render() {
        const { fields, errors } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={(e)=>{e.preventDefault(); this.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                    <h3>Configure Fund Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="addFunds" checked={fields.addFunds} handleInputChange={this.handleInputChange} label="Users can Select Different Funds?"/>
                        </div>
                        { this.renderFundInputs(fields.numFunds) }
                        { 
                            fields.addFunds ? (
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <div style={{maxWidth: "170px"}}>
                                        <FormButton val="Add Setting" handleClick={this.handleButtonClick} ctx={{name: "funds", val: '', type: 'Add'}} />
                                    </div>
                                </div>
                            ) : null
                        }
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                        <div style={{maxWidth: "88px"}}>
                            <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: "store", val: '', type: 'form_setup'}} />
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>

        )
    }
}