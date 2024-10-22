import React, {Fragment} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import SaveButton from './SaveButton'
import InputGroup from './InputGroup'
import SelectGroup from './SelectGroup'
import withFormConfigHandling from './withFormConfigHandling'

const SubscriptionSettings = props => {
    
    const { fields, errors } = props;

    const renderSubInputs = num => {

        const arr = Array(num).fill(null);

        return arr.map((el, ind) => {

            const subTypes = [
                { val: 'NewsletterSubs', label: 'Newsletter Subscribe'},
                { val: 'NewsletterUnSubs', label: 'Newsletter Unsubscribe'},
                { val: 'MarketingUnSubs', label: 'Marketing Unsubscribe'},
            ]

            const options = subTypes.map((subType, sTind) => {
                return <option key={`subOption-${ind}-${sTind}`} value={subType.val}>{subType.label}</option>
            });
            
            return (

                <fieldset key={`subInput-${ind}`} styleName='form.fieldset__bordered'>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <SelectGroup
                            label={`Subscription ${ind + 1}: Type`} 
                            id={`subscriptions-${ind}-key`} 
                            specialStyle=""
                            required={true}
                            value={fields.subscriptions[ind]["key"] || subTypes[0].val}
                            error={errors.subscriptions[ind]["key"]}
                            handleInputChange={props.handleInputChange}
                            options={options}
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`subscriptions-${ind}-value`} 
                            specialStyle="" 
                            label={`Subscription ${ind + 1}: Name`}
                            placeholder="i.e. Welcome, CBN, etc" 
                            required={true} 
                            value={fields.subscriptions[ind]["value"]} 
                            handleInputChange={props.handleInputChange} 
                            error={errors.subscriptions[ind]["value"]} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <div>
                            <FormButton val="Remove" handleClick={props.handleButtonClick} ctx={{name: "subscriptions", val: ind, type: 'Remove'}} />
                        </div>
                    </div>
                </fieldset>
            )
        })
    }

    return (
        <Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); props.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Subscription Setttings</h3>
                <p styleName="form.form-info">Use these settings to either subscribe or unsubscribe to newsletters or to unsubscribe from default CBN marketing lists. Contact the Digital Media Group for help with these settings.</p>
                { renderSubInputs(fields.subscriptions.length) }

                <fieldset styleName="form.fieldset">
                    <div style={{maxWidth: "170px"}}>
                        <FormButton val="Add Setting" handleClick={props.handleButtonClick} ctx={{name: "subscriptions", val: '', type: 'Add'}} />
                    </div>
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
        </Fragment>
    )
}

export default withFormConfigHandling(SubscriptionSettings);