import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';

export default class NameSettings extends Component {
    constructor(props) {
        super(props);
        // console.log({props});
        const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
        this.state = {
            updated: false,
            saved: false,
            fields: {
                getMiddleName: editMode ? props.formConfig.getMIddleName : false,
                getSuffix: editMode ? props.formConfig.getSuffix: false,
                getSpouseInfo: editMode ? props.formConfig.getSpouseInfo : false,
                getPhone: editMode ? props.formConfig.getPhone : true,
                international: editMode ? props.formConfig.international : true,
                shipping: editMode ? props.formConfig.shipping: true
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleEditApiKey = this.handleEditApiKey.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        
    }

    handleButtonClick(e, ctx) {
        
    }

    async handleEditApiKey(e) {
        
    }

    handleInputChange(e) {
       
    }

 
    render() {
        const { fields } = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Name/Address Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="getMiddleName" checked={fields.getMiddleName} handleInputChange={this.handleInputChange} label="Get Donor's Middle Name?"/>
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="getSuffix" checked={fields.getSuffix} handleInputChange={this.handleInputChange} label="Get Donor's Suffix Information, i.e. Jr, Sr, etc...?"/>
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="getSpouseInfo" checked={fields.getSpouseInfo} handleInputChange={this.handleInputChange} label="Get Donor's Spouse First and Last name?"/>
                        </div>
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="getPhone" checked={fields.getPhone} handleInputChange={this.handleInputChange} label="Ask for Phone Number?"/>
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="international" checked={fields.international} handleInputChange={this.handleInputChange} label="Allow International Addresses?"/>
                        </div>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="shipping" checked={fields.shipping} handleInputChange={this.handleInputChange} label="Allow Separate Shipping Addresses?"/>
                        </div>
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