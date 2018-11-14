import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import Checkbox from './Checkbox'
import RadioButton from './RadioButton'
import InputGroup from './InputGroup'
import SelectGroup from './SelectGroup'
import withFormConfigHandling from './withFormConfigHandling'

const GivingSettings = props => {

    const { fields, errors } = props;

    renderAmtInputs = (type, num) => {

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
                        validation="[1-9]+\d*"
                        value={fields[`${type}Amt-${ind}`]} 
                        handleInputChange={props.handleInputChange} 
                        error={perrors[`${type}Amt-${ind}`]} 
                    />
                </React.Fragment>
            )
        })
    }

    renderDefaultSelect = (option) => {

        const amounts = option === "monthly" ? props.fields.monthlyAmounts : props.fields.singleAmounts;

        const options = amounts.map((amt, ind) => {
            return <option key={`amt-option-${ind}`} value={amt}>{amt}</option>
        })

        return (
            <SelectGroup 
                id="DefaultAmount"
                label="Default Amount"
                specialStyle=""
                required={false}
                value={fields.defaultAmount}
                error={errors.defaultAmount}
                handleInputChange={props.handleInputChange}
                options={options}
            />
        ) 
    }

    return (
        <React.Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); props.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Giving Setttings</h3>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="showGivingArray" checked={fields.showGivingArray} handleInputChange={props.handleInputChange} label="Show Giving Array(s)?"/>
                    </div>

                    {
                        fields.showGivingArray ? (
                            <React.Fragment>
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <Checkbox id="monthlyOption" checked={fields.monthlyOption} handleInputChange={props.handleInputChange} label="Show Monthly Giving Options?"/>
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
                                                    validation="[1-9]+\d*"
                                                    value={fields.numMonthlyAmounts} 
                                                    handleInputChange={props.handleInputChange} 
                                                    error={errors.numMonthlyAmounts} 
                                                />
                                            </div>
                                            <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                { props.renderAmtInputs("monthly", fields.numMonthlyAmounts) }
                                            </div>
                                        </React.Fragment>
                                    ) : null
                                }

                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <Checkbox id="singleOption" checked={fields.singleOption} handleInputChange={props.handleInputChange} label="Show Single Giving Options"/>
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
                                                    validation="[1-9]+\d*"
                                                    value={fields.numSingleAmounts} 
                                                    handleInputChange={props.handleInputChange} 
                                                    error={errors.numSingleAmounts} 
                                                />
                                            </div>
                                            <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                { renderAmtInputs("single", fields.numMonthlyAmounts) }
                                            </div>
                                        </React.Fragment>
                                    ) : null
                                }

                                {
                                    fields.singleOption && fields.monthlyOption ? (
                                        <React.Fragment>
                                            <h3>Choose Default Option</h3>
                                            <p styleName="form.form-info">No default option is required.</p>
                                            <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                
                                                <div styleName="flex.flex flex.flex-row flex.flex-between form.monthly-radio">
                                                    <RadioButton id="monthlygift" name="monthly-toggle" label="Monthly Gift" checked={fields.defaultOption === "monthly"} handleRadioClick={props.handleRadioClick}/>
                                                    <RadioButton id="singlegift" name="monthly-toggle" label="Single Gift" checked={fields.defaultOption === "single"} handleRadioClick={props.handleRadioClick}/>
                                                    <RadioButton id="nullgift" name="monthly-toggle" label="No Default Option" checked={fields.defaultOption === ""} handleRadioClick={props.handleRadioClick}/>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ) : null
                                }

                                {
                                    fields.defaultOption !== '' ? (
                                        <React.Fragment>
                                            <h3>Select Default Amount</h3>
                                            <p styleName="form.form-info">No default Amount is required. However, if the default amount is not found within the default Giving Options, no default will be set.</p>
                                            <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                                { renderDefaultSelect( fields.defaultOptions ) }
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
                        <SaveButton 
                            handleClick={props.handleButtonClick} 
                            submitting={props.submitting} 
                            ctx={{name: "store", val: '', type: 'form_setup'}} 
                            error={errors.formError} 
                            formMsg={props.updated && !props.saved ? "Changes require saving": ''}
                        />
                    </div>
                </fieldset>
            </form>
        </React.Fragment>
    )
}

export default withFormConfigHandling(GivingSettings);