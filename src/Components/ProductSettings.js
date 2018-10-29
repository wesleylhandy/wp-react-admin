import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';
import TextGroup from './TextGroup';


export default class ProductSettings extends Component {
    constructor(props) {
        super(props);
        const editMode = props.adminMode == "Edit"
        this.state = {
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
                products: []
            }
        }
        if (editMode) {
            for (let i = 0; i < props.formConfig.subscriptions.length; i++) {
                this.state.errors.products.push({
                    [`product-${i}-productTitle`]: '',
                    [`product-${i}-productMessage`]: '',
                    [`product-${i}-productImgUrl`]: '',
                    [`product-${i}-DetailName`]: '',
                    [`product-${i}-DetailCprojMail`]: '',
                    [`product-${i}-DetailCprojCredit`]: '',
                    [`product-${i}-DetailDescription`]: ''
                });
            }
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleProductInput = this.handleProductInput.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.renderProductInputs = this.renderProductInputs.bind(this)
    }

    handleButtonClick(e) {

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
                <fieldset styleName="form.fieldset__bordered" key={`productRow-${ind}`}>
                    <h4>Product {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row">
                        <InputGroup
                            type="text"
                            id={`product-${ind}-productTitle`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Title`}
                            maxLength={120}
                            placeholder="i.e. To Life DVD" 
                            required={true} 
                            value={this.state.fields.products[ind].productTitle} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind][`product-${ind}-productTitle`]} 
                        />
                        <TextGroup
                            id={`product-${ind}-productMessage`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Description`}
                            maxLength={512}
                            rows={3}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={true} 
                            value={this.state.fields.products[ind].productMessage} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind][`product-${ind}-productMessage`]} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`product-${ind}-productImgUrl`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Product Image URL`}
                            maxLength={256}
                            placeholder="i.e. https://www.cbn.com/giving/special/tolife/assets/images/dvd-img.png" 
                            required={true} 
                            value={this.state.fields.products[ind].productImgUrl} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind][`product-${ind}-productImgUrl`]} 
                        />
                        <InputGroup
                            type="text"
                            id={`product-${ind}-PledgeAmount`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Pledge Amount`}
                            maxLength={7}
                            placeholder={15} 
                            required={true} 
                            value={this.state.fields.products[ind].PledgeAmount} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind].PledgeAmount} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">

                        <InputGroup
                            type="text"
                            id={`product-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Detail Name`}
                            maxLength={4}
                            placeholder="i.e. CC01" 
                            required={true} 
                            value={this.state.fields.products[ind].DetailName} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind][`product-${ind}-DetailName`]} 
                        />
                        <InputGroup
                            type="text"
                            id={`product-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: WhiteMail SOL`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={this.state.fields.products[ind].DetailCprojMail} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind][`product-${ind}-DetailCprojMail`]} 
                        />
                        <InputGroup
                            type="text"
                            id={`product-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Credit SOL`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={this.state.fields.products[ind].DetailCprojCredit} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind][`product-${ind}-DetailCprojCredit`]} 
                        />
                        <InputGroup
                            type="text"
                            id={`product-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: SOL Description`}
                            maxLength={6}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={this.state.fields.products[ind].DetailDescription} 
                            handleInputChange={this.handleProductInput} 
                            error={this.state.errors.products[ind][`product-${ind}-DetailDescription`]} 
                        />
                    </div>
                </fieldset>
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
                        { this.renderProductInputs(fields.numProducts) }
                        { 
                            fields.addProducts ? (
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                    <div style={{maxWidth: "157px"}}>
                                        <FormButton val="Add Setting" handleClick={this.handleButtonClick} ctx={{name: "products", val: '', type: 'Add'}} />
                                    </div>
                                </div>
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