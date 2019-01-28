import React, {Fragment} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import SaveButton from './SaveButton'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';
import TextGroup from './TextGroup';
import withFormConfigHandling from './withFormConfigHandling'

const FundSettings = ({fields, errors, handleButtonClick, handleInputChange, submitting, updated, saved}) => {

    const renderFundInputs = num => {

        const arr = Array(num).fill(null);

        return arr.map((el, ind) => {
            return (
                <fieldset key={`fundRow-${ind}`} styleName='form.fieldset__bordered'>
                    <h4>Designation {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center flex.flex-wrap">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-fundTitle`} 
                            specialStyle="" 
                            label={`Designation ${ind+1}: Title`}
                            maxLength={120}
                            placeholder="i.e. Wherever Needed Most" 
                            required={true} 
                            value={fields.funds[ind].fundTitle} 
                            handleInputChange={handleInputChange} 
                            error={errors.funds[ind].fundTitle} 
                        />
                        <TextGroup
                            id={`funds-${ind}-fundDescription`} 
                            specialStyle="" 
                            label={`Designation ${ind+1}: Description`}
                            rows={3}
                            maxLength={512}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={false} 
                            value={fields.funds[ind].fundDescription} 
                            handleInputChange={handleInputChange} 
                            error={errors.funds[ind].fundDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center flex.flex-wrap">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Designation ${ind+1}: Detail Name`}
                            maxLength={15}
                            placeholder="i.e. Superbook, OrphansPromise, 700Club, etc" 
                            required={true} 
                            value={fields.funds[ind].DetailName} 
                            handleInputChange={handleInputChange} 
                            error={errors.funds[ind].DetailName} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Designation ${ind+1}: WhiteMail SOL`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={false} 
                            value={fields.funds[ind].DetailCprojMail} 
                            handleInputChange={handleInputChange} 
                            error={errors.funds[ind].DetailCprojMail} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Designation ${ind+1}: Credit SOL`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={fields.funds[ind].DetailCprojCredit} 
                            handleInputChange={handleInputChange} 
                            error={errors.funds[ind].DetailCprojCredit} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Designation ${ind+1}: SOL Description`}
                            maxLength={40}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={fields.funds[ind].DetailDescription} 
                            handleInputChange={handleInputChange} 
                            error={errors.funds[ind].DetailDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <div>
                            <FormButton val="Remove" handleClick={handleButtonClick} ctx={{name: "funds", val: ind, type: 'Remove'}} />
                        </div>
                    </div>
                </fieldset>
            )
        })
    }
        
    return (
        <Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Designation Setttings</h3>
                <fieldset styleName="form.fieldset">
                    <p styleName="form.form-info">Please optimise your form so that the first designated SOL that can be selected matches the SOL settings for the single or monthly giving. Also, it is best practice that the first SOL be allocated to "General Giving" or to "Wherever Help Is Needed Most".</p>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="addFunds" checked={fields.addFunds} handleInputChange={handleInputChange} label="Users can Select Different Funds?"/>
                    </div>
                    { renderFundInputs(fields.numFunds) }
                    { 
                        fields.addFunds && (
                            <Fragment>
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <div style={{maxWidth: "170px"}}>
                                        <FormButton val="Add Setting" handleClick={handleButtonClick} ctx={{name: "funds", val: '', type: 'Add'}} />
                                    </div>
                                </div>
                                <p styleName="form.form-info">Clicking this button allows you to add an empty, configurable Designation setting.</p>
                            </Fragment>
                        ) 
                    }
                </fieldset>
                <fieldset styleName="form.fieldset">
                    <div style={{maxWidth: "88px"}}>
                        <SaveButton 
                            handleClick={handleButtonClick} 
                            submitting={submitting} 
                            ctx={{name: "store", val: '', type: 'form_setup'}} 
                            error={errors.formError} 
                            formMsg={updated && !saved ? "Changes require saving": ''}
                        />
                    </div>
                </fieldset>
            </form>
        </Fragment>

    )
}

export default withFormConfigHandling(FundSettings);