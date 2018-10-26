import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import RadioButton from './RadioButton';
import InputGroup from './InputGroup';
import SelectGroup from './SelectGroup';

export default class GivingSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit"
        this.state = {
            updated: false,
            saved: false,
            fields: {
                showGivingArray: editMode ? props.formConfig.showGivingArray : true,
                monthlyOption: editMode ? props.formConfig.monthlyOption : true,
                singleOption: editMode ? props.formConfig.singleOption : true,
                numMonthlyAmounts: editMode ? props.formConfig.monthlyAmounts.length : 0,
                monthlyAmounts: editMode ? [...props.formConfig.monthlyAmounts] : [],
                numSingleAmounts: editMode ? props.formConfig.singleAmounts : 0,
                singleAmounts: editMode ? [...props.formConfig.singleAmounts] : [],
                defaultOption: editMode ? props.formConfig.monthlyOption : "",
                defaultAmount: editMode ? props.formConfig.defaultAmount : -1,
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
            for (let i = 0; i < props.formConfig.monthlyAmounts.length; i++) {
                this.state.fields["monthlyAmt-" + i] = props.formConfig.monthlyAmounts[i]
            }
            for (let j = 0; j < props.formConfig.singleAmounts.length; j++) {
                this.state.fields["singleAmt-" + j] = props.formConfig.singleAmounts[j]
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

    async handleEditApiKey(e) {
        
    }

    handleInputChange(e) {
       
    }

    renderAmtInputs(type, num) {
        const arr = Array(num).fill(null);
        return arr.map((el, ind)=>{
            return (
                <React.Fragment key={`${type}Input-${ind}`}>
                    <InputGroup
                        type="text"
                        id={`${type}-${ind}`} 
                        specialStyle="" 
                        label={`Amount ${ind+1}`}
                        placeholder="Whole #, no $" 
                        required={true} 
                        value={this.state.fields[`${type}Amt-${ind}`]} 
                        handleInputChange={this.handleInputChange} 
                        error={this.state.errors[`${type}Amt-${ind}`]} 
                    />
                </React.Fragment>
            )
        })
    }

    renderDefaultSelect(option) {
        const amounts = option === "monthly" ? this.state.fields.monthlyAmounts : this.state.fields.singleAmounts;
        const options = amounts.map((amt, ind) => {
            return <option key={`amt-option-${ind}`} value={amt}>{amt}</option>
        })
        return (
            <SelectGroup 
                id="DefaultAmount"
                label="Default Amount"
                specialStyle=""
                required={false}
                value={this.state.fields.defaultAmount}
                error={this.state.errors.defaultAmount}
                handleInputChange={this.handleInputChange}
                options={options}
            />
        ) 
    }

    /**
     * Updates cart to remove any selected donations and toggles between monthly and single giving
     * @param {Event} e 
     */
    handleRadioClick(e) {

    }

 
    render() {
        const { fields, errors } = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Giving Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="showGivingArray" checked={fields.showGivingArray} handleInputChange={this.handleInputChange} label="Show Giving Array(s)?"/>
                        </div>
                        {
                            fields.showGivingArray ? (
                                <React.Fragment>
                                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                        <Checkbox id="monthlyOption" checked={fields.monthlyOption} handleInputChange={this.handleInputChange} label="Show Monthly Giving Options?"/>
                                    </div>
                                    { 
                                        fields.monthlyOption ? (
                                            <React.Fragment>
                                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                    <InputGroup
                                                        type="text"
                                                        id="numMonthlyAmounts" 
                                                        specialStyle="" 
                                                        label="How many monthly gift amount options?" 
                                                        placeholder="1 or more" 
                                                        required={true} 
                                                        value={fields.numMonthlyAmounts} 
                                                        handleInputChange={this.handleInputChange} 
                                                        error={errors.numMonthlyAmounts} 
                                                    />
                                                </div>
                                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                    { this.renderAmtInputs("monthly", fields.numMonthlyAmounts) }
                                                </div>
                                            </React.Fragment>
                                        ) : null
                                    }
                                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                        <Checkbox id="singleOption" checked={fields.singleOption} handleInputChange={this.handleInputChange} label="Show Single Giving Options"/>
                                    </div>
                                    { 
                                        fields.singleOption ? (
                                            <React.Fragment>
                                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                    <InputGroup
                                                        type="number"
                                                        id="numSingleAmounts" 
                                                        specialStyle="" 
                                                        label="How many single gift amount options?" 
                                                        placeholder="1, 2, 3, etc" 
                                                        min={1} 
                                                        required={true} 
                                                        value={fields.numSingleAmounts} 
                                                        handleInputChange={this.handleInputChange} 
                                                        error={errors.numSingleAmounts} 
                                                    />
                                                </div>
                                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                    { this.renderAmtInputs("single", fields.numMonthlyAmounts) }
                                                </div>
                                            </React.Fragment>
                                        ) : null
                                    }
                                    {
                                        fields.singleOption && fields.monthlyOption ? (
                                            <React.Fragment>
                                                <h3>Choose Default Option</h3>
                                                
                                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                    
                                                    <div styleName="flex.flex flex.flex-row flex.flex-between form.monthly-radio">
                                                        <RadioButton id="monthly" name="monthly-toggle" label="Monthly Gift" checked={fields.defaultOption === "monthly"} handleRadioClick={this.handleRadioClick}/>
                                                        <RadioButton id="single" name="monthly-toggle" label="Single Gift" checked={fields.defaultOption === "monthly"} handleRadioClick={this.handleRadioClick}/>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ) : null
                                    }
                                    {
                                        fields.defaultOption !== '' ? (
                                            <React.Fragment>
                                                <h3>Select Default Amount</h3>
                                                
                                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                    { this.renderDefaultSelect( fields.defaultOptions ) }
                                                </div>
                                            </React.Fragment>
                                        ) : null
                                    }
                                </React.Fragment>
                            ) : null
                        }
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