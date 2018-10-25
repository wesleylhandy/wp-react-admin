import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';


export default class ProductSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit"
        this.state = {
            hydrate: editMode,
            updated: false,
            saved: false,
            fields: {
                addProducts: editMode ? props.formConfig.numProducts > 0 : false,
                numProducts: editMode ? props.formConfig.numProducts : 0,
                products: editMode ? [...props.formConfig.products] : []
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
            for (let i = 0; i < props.formConfig.products.length; i++) {
                this.state.fields["product-" + i] = props.formConfig.products[i]
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleProductInput = this.handleProductInput.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderProductInputs = this.renderProductInputs.bind(this)
    }

    async componentDidMount() {
        
    }

    async handleProductInput(e) {
        
    }

    handleInputChange(e) {
       
    }

    renderProductInputs(num) {
        const arr = Array(num).fill(null);
        return arr.map((el, ind)=>{
            return (
                <React.Fragment key={`productRow-${ind}`}>
                    <h4>Product {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`product-${ind}-title`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:Title`}
                            maxLength={120}
                            placeholder="i.e. To Life DVD" 
                            required={true} 
                            value={this.state.fields[`product-${ind}`].productTitle} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`product-${ind}`].productTitle} 
                        />
                        <InputGroup
                            type="text"
                            id={`product-${ind}-message`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:Description`}
                            maxLength={512}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={true} 
                            value={this.state.fields[`product-${ind}`].productMessage} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`product-${ind}`].productMessage} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`product-${ind}-imgUrl`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:Product Image Url`}
                            maxLength={256}
                            placeholder="i.e. https://www.cbn.com/giving/special/tolife/assets/images/dvd-img.png" 
                            required={true} 
                            value={this.state.fields[`product-${ind}`].productMessage} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`product-${ind}`].productMessage} 
                        />
                        <InputGroup
                            type="text"
                            id={`product-${ind}-PledgeAmount`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:Pledge Amount`}
                            maxLength={7}
                            placeholder={15} 
                            required={true} 
                            value={this.state.fields[`product-${ind}`].PledgeAmount} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`product-${ind}`].PledgeAmount} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">

                        <InputGroup
                            type="text"
                            id={`Product-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:Detail Name`}
                            maxLength={4}
                            placeholder="i.e. CC01" 
                            required={true} 
                            value={this.state.fields[`Product-${ind}`].DetailName} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`Product-${ind}`].DetailName} 
                        />
                        <InputGroup
                            type="text"
                            id={`Product-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:WhiteMail Solicitation`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={this.state.fields[`Product-${ind}`].DetailCprojMail} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`Product-${ind}`].DetailCprojMail} 
                        />
                        <InputGroup
                            type="text"
                            id={`Product-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:Credit Solicitation`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={this.state.fields[`Product-${ind}`].DetailCprojCredit} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`Product-${ind}`].DetailCprojCredit} 
                        />
                        <InputGroup
                            type="text"
                            id={`Product-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Product ${ind+1}:Solicitation Description`}
                            maxLength={6}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={this.state.fields[`Product-${ind}`].DetailDescription} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors[`Product-${ind}`].DetailDescription} 
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
                    <h3>Configure Product Setttings</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="addProducts" checked={fields.addProducts} handleInputChange={this.handleInputChange} label="Users can Select Product(s)?"/>
                        </div>
                        { 
                            fields.addProducts ? (
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <InputGroup
                                        type="number"
                                        id="numProducts" 
                                        specialStyle="" 
                                        label="How many Product options?" 
                                        placeholder="1, 2, 3, etc" 
                                        min={1} 
                                        required={true} 
                                        value={fields.numProducts} 
                                        handleInputChange={this.handleInputChange} 
                                        error={errors.numProducts} 
                                    />
                                </div>
                            ) : null
                        }
                        { this.renderProductInputs(fields.numProducts) }
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