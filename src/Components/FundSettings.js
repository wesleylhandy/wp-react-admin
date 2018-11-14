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
        const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
        this.state = {
            updated: false,
            saved: false,
            initialState: {
                ...props.defaultValues
            },
            fields: {
                addFunds: editMode ? props.formConfig.numFunds > 0 : false,
                numFunds: editMode ? props.formConfig.numFunds : 0,
                funds: editMode ? [...props.formConfig.funds] : []
            },
            errors: {
                showGivingArray: '',
                monthlyOption: '',
                singleOption: '',
                numMonthlyAmounts: '',
                monthlyAmounts: '',
                numSingleAmounts: '',
                singleAmounts: '',
                defaultOption: '',
                defaultAmount: '',
                funds: []
            }
        }
        if (editMode) {
            for (let i = 0; i < props.formConfig.subscriptions.length; i++) {
                this.state.errors.funds.push({
                    [`fund-${i}-Title`]: '',
                    [`fund-${i}-FundDescription`] : '',
                    [`fund-${i}-DetailName`]: '',
                    [`fund-${i}-DetailCprojMail`]: '',
                    [`fund-${i}-DetailCprojCredit`]: '',
                    [`fund-${i}-DetailDescription`]: ''
                });
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFundInput = this.handleFundInput.bind(this)
        this.renderFundInputs = this.renderFundInputs.bind(this)
    }

    async componentDidMount() {
        
    }

    handleButtonClick(ctx) {
        
    }

    async handleFundInput(e) {
        
    }

    handleInputChange(e) {
       
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
                            id={`fund-${ind}-Title`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Title`}
                            maxLength={120}
                            placeholder="i.e. Wherever Needed Most" 
                            required={true} 
                            value={this.state.fields.funds[ind].Title} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors.funds[ind][`fund-${ind}-title`]} 
                        />
                        <TextGroup
                            id={`fund-${ind}-FundDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Description`}
                            rows={3}
                            maxLength={512}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={true} 
                            value={this.state.fields.funds[ind].FundDescription} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors.funds[ind][`fund-${ind}-FundDescription`]} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Detail Name`}
                            maxLength={32}
                            placeholder="i.e. Superbook, OrphansPromise, 700Club, etc" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailName} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors.funds[ind][`fund-${ind}-DetailName`]} 
                        />
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: WhiteMail SOL`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailCprojMail} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors.funds[ind][`fund-${ind}-DetailCprojMail`]} 
                        />
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Credit SOL`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailCprojCredit} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors.funds[ind][`fund-${ind}-DetailCprojCredit`]} 
                        />
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: SOL Description`}
                            maxLength={32}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailDescription} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors.funds[ind][`fund-${ind}-DetailDescription`]} 
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