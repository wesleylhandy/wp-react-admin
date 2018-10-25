import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import InputGroup from './InputGroup';
import SelectGroup from './SelectGroup';

export default class SubscriptionSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit"
        this.state = {
            hydrate: editMode,
            updated: false,
            saved: false,
            fields: {
                subscriptions: editMode ? [...props.formConfig.subscriptions] : [],
            },
            errors: {
                subscriptions: '',
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderSubInputs = this.renderSubInputs.bind(this)
    }
    async componentDidMount() {
        
    }

    handleButtonClick(e, ctx) {
        
    }

    handleInputChange(e) {
       
    }

    renderSubInputs(type, num) {
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
                <form>
                    <h3>Configure Subscription Setttings</h3>
                    <fieldset styleName="form.fieldset">
                    { this.renderSubInputs(fields.subscriptions.length) }
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