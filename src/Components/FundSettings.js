import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';


export default class FundSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit"
        this.state = {
            hydrate: editMode,
            updated: false,
            saved: false,
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
            }
        }
        if (editMode) {
            for (let i = 0; i < props.formConfig.funds.length; i++) {
                this.state.fields["fund-" + i] = props.formConfig.funds[i]
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleEditApiKey = this.handleEditApiKey.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderAmtInputs = this.renderAmtInputs.bind(this)
        this.renderDefaultSelect = this.renderDefaultSelect.bind(this)
    }

    async componentDidMount() {
        
    }

    handleButtonClick(e, ctx) {
        
    }

    async handleFundInput(e) {
        
    }

    handleInputChange(e) {
       
    }

    renderFundInputs(num) {
        const arr = Array(num).fill(null);
        return arr.map((el, ind)=>{
            return (
                <React.Fragment key={`fundRow-${ind}`}>
                    <h4>Fund {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-title`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}:Title`}
                            maxLength={120}
                            placeholder="i.e. Wherever Needed Most" 
                            required={true} 
                            value={this.state.fields[`fund-${ind}`].Title} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors[`fund-${ind}`].Title} 
                        />
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-description`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}:Description`}
                            maxLength={512}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={true} 
                            value={this.state.fields[`fund-${ind}`].FundDescription} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors[`fund-${ind}`].FundDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}:Detail Name`}
                            maxLength={32}
                            placeholder="i.e. Superbook, OrphansPromise, 700Club, etc" 
                            required={true} 
                            value={this.state.fields[`fund-${ind}`].DetailName} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors[`fund-${ind}`].DetailName} 
                        />
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}:WhiteMail Solicitation`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={this.state.fields[`fund-${ind}`].DetailCprojMail} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors[`fund-${ind}`].DetailCprojMail} 
                        />
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}:Credit Solicitation`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={this.state.fields[`fund-${ind}`].DetailCprojCredit} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors[`fund-${ind}`].DetailCprojCredit} 
                        />
                        <InputGroup
                            type="text"
                            id={`fund-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}:Solicitation Description`}
                            maxLength={6}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={this.state.fields[`fund-${ind}`].DetailDescription} 
                            handleInputChange={this.handleFundInput} 
                            error={this.state.errors[`fund-${ind}`].DetailDescription} 
                        />
                    </div>
                </React.Fragment>
            )
        })
    }

     
    render() {
        const { fields, errors } = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Fund Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="addFunds" checked={fields.addFunds} handleInputChange={this.handleInputChange} label="Users can Select Different Funds?"/>
                        </div>
                        { 
                            fields.addFunds ? (
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <InputGroup
                                        type="text"
                                        id="numFunds" 
                                        specialStyle="" 
                                        label="How many fund options?" 
                                        placeholder="1, 2, 3, etc" 
                                        required={true} 
                                        value={fields.numFunds} 
                                        handleInputChange={this.handleInputChange} 
                                        error={errors.numFunds} 
                                    />
                                </div>
                            ) : null
                        }
                        { this.renderFundInputs(fields.numFunds) }
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