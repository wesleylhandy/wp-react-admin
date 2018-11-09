import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';
import SelectGroup from './SelectGroup';

export default class SubscriptionSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
        this.state = {
            updated: false,
            saved: false,
            fields: {
                subscriptions: editMode ? [...props.formConfig.subscriptions] : [],
            },
            errors: {
                subscriptions: [],
            }
        }
        if (editMode) {
            for (let i = 0; i < props.formConfig.subscriptions.length; i++) {
                this.state.errors.subscriptions.push({[`sub-${i}-key`]: '', [`sub-${i}-value`] : ''});
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderSubInputs = this.renderSubInputs.bind(this)
    }
    async componentDidMount() {
        
    }

    handleButtonClick(ctx) {
        
    }

    handleInputChange(e) {
       
    }

    renderSubInputs(num) {
        const arr = Array(num).fill(null);
        return arr.map((el, ind)=>{
            const subTypes = [
                { val: 'NewsletterSubs', label: 'Newsletter Subscribe'},
                { val: 'NewsletterUnSubs', label: 'Newsletter Unsubscribe'},
                { val: 'MarketingSubs', label: 'Marketing Subscribe'},
                { val: 'MarketingUnSubs', label: 'Marketing Unubscribe'},
            ]
            const options = subTypes.map((subType, sTind)=>{
                return <option key={`subOption-${ind}-${sTind}`} value={subType.val}>{subType.label}</option>
            });
            return (

                <fieldset key={`subInput-${ind}`} styleName='form.fieldset__bordered'>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <SelectGroup
                            label={`Subscription ${ind + 1}: Type`} 
                            id={`sub-${ind}-key`} 
                            specialStyle=""
                            required={false}
                            value={this.state.fields.subscriptions[ind].key}
                            error={this.state.errors.subscriptions[ind][`sub-${ind}-key`]}
                            handleInputChange={this.handleInputChange}
                            options={options}
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`sub-${ind}-value`} 
                            specialStyle="" 
                            label={`Subscription ${ind + 1}: Name`}
                            placeholder="i.e. Welcome, CBN, etc" 
                            required={true} 
                            value={this.state.fields.subscriptions[ind].value} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.subscriptions[ind][`sub-${ind}-value`]} 
                        />
                    </div>
                </fieldset>
            )
        })
    }

    /**
     * Updates cart to remove any selected donations and toggles between monthly and single giving
     * @param {Event} e 
     */
    handleRadioClick(e) {

    }

 
    render() {
        const { fields } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={(e)=>{e.preventDefault(); this.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                    <h3>Configure Subscription Setttings</h3>

                    { this.renderSubInputs(fields.subscriptions.length) }
                    <fieldset styleName="form.fieldset">
                        <div style={{maxWidth: "170px"}}>
                            <FormButton val="Add Setting" handleClick={this.handleButtonClick} ctx={{name: "subscription", val: '', type: 'Add'}} />
                        </div>
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