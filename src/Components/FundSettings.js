import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import SaveButton from './SaveButton'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';
import TextGroup from './TextGroup';
import withFormConfigHandling from './withFormConfigHandling'

const FundSettings = props => {

    const { fields, errors } = props;

    const renderFundInputs = num => {

        const arr = Array(num).fill(null);

        return arr.map((el, ind) => {
            return (
                <fieldset key={`fundRow-${ind}`} styleName='form.fieldset__bordered'>
                    <h4>Fund {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center flex.flex-wrap">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-Title`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Title`}
                            maxLength={120}
                            placeholder="i.e. Wherever Needed Most" 
                            required={true} 
                            value={props.fields.funds[ind].fundTitle} 
                            handleInputChange={props.handleInputChange} 
                            error={props.errors.funds[ind].fundTitle} 
                        />
                        <TextGroup
                            id={`funds-${ind}-FundDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Description`}
                            rows={3}
                            maxLength={512}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={false} 
                            value={props.fields.funds[ind].fundDescription} 
                            handleInputChange={props.handleInputChange} 
                            error={props.errors.funds[ind].fundDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center flex.flex-wrap">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Detail Name`}
                            maxLength={15}
                            placeholder="i.e. Superbook, OrphansPromise, 700Club, etc" 
                            required={true} 
                            value={props.fields.funds[ind].DetailName} 
                            handleInputChange={props.handleInputChange} 
                            error={props.errors.funds[ind].DetailName} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: WhiteMail SOL`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={props.fields.funds[ind].DetailCprojMail} 
                            handleInputChange={props.handleInputChange} 
                            error={props.errors.funds[ind].DetailCprojMail} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Credit SOL`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={props.fields.funds[ind].DetailCprojCredit} 
                            handleInputChange={props.handleInputChange} 
                            error={props.errors.funds[ind].DetailCprojCredit} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: SOL Description`}
                            maxLength={40}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={props.fields.funds[ind].DetailDescription} 
                            handleInputChange={props.handleInputChange} 
                            error={props.errors.funds[ind].DetailDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <div>
                            <FormButton val="Remove" handleClick={props.handleButtonClick} ctx={{name: "funds", val: ind, type: 'Remove'}} />
                        </div>
                    </div>
                </fieldset>
            )
        })
    }
        
    return (
        <React.Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); props.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Fund Setttings</h3>
                <fieldset styleName="form.fieldset">
                    <p styleName="form.form-info">Please optimise your form so that the first fund that can be selected matches the fund settings for the single or monthly giving. Also, it is best practice that the first fund be allocated to "General Giving" or to "Wherever Help Is Needed Most".</p>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="addFunds" checked={fields.addFunds} handleInputChange={props.handleInputChange} label="Users can Select Different Funds?"/>
                    </div>
                    { renderFundInputs(fields.numFunds) }
                    { 
                        fields.addFunds ? (
                            <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                <div style={{maxWidth: "170px"}}>
                                    <FormButton val="Add Setting" handleClick={props.handleButtonClick} ctx={{name: "funds", val: '', type: 'Add'}} />
                                </div>
                            </div>
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

export default withFormConfigHandling(FundSettings);