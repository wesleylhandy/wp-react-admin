import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import styles from './styles/index.css'

import FormButton from './FormButton'
import swal from 'sweetalert'
import Checkbox from './Checkbox';
import InputGroup from './InputGroup';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        console.log({props});
        this.state = {
            errors: {},
            fields: {}
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
        const {fields, errors} = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Configure Main Setttings</h3>
                    <ul>
                        <li>
                            <InputGroup
                                type="text"
                                id="form_name" 
                                specialStyle="" 
                                label="Campaign Name/URL Slug" 
                                placeholder="i.e. Giving, or End-of-Year" 
                                maxLength="256" 
                                required={true} 
                                value={fields.form_name} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.form_name} 
                            />
                        </li>
                        <li>
                            <InputGroup
                                type="text"
                                id="thankYouUrl" 
                                specialStyle="" 
                                label="Thank You Page Url" 
                                placeholder="/thank-you" 
                                maxLength="256" 
                                required={true} 
                                value={fields.thankYouUrl} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.thankYouUrl} 
                            />
                        </li>
                        <li>
                            <Checkbox id="AddContactYN" checked={fields.AddContactYN} handleInputChange={this.handleInputChange} label="Add Contact with Transaction?"/>
                        </li>
                        {
                            fields.AddContactYN ? (
                                <InputGroup
                                    type="text"
                                    id="ContactSource" 
                                    specialStyle="" 
                                    label="Contact Source" 
                                    placeholder="i.e. 700Club Donor" 
                                    maxLength="20" 
                                    required={true} 
                                    value={fields.ContactSource} 
                                    handleInputChange={this.handleInputChange} 
                                    error={errors.ContactSource} 
                                />
                            ) : null
                        }
                        <li>
                            <InputGroup
                                type="text"
                                id="SectionName" 
                                specialStyle="" 
                                label="Section Name" 
                                placeholder="i.e. 700Club" 
                                maxLength="20" 
                                required={true} 
                                value={fields.SectionName} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.SectionName} 
                            />
                        </li>
                        <li>
                            <InputGroup
                                type="text"
                                id="ActivityName" 
                                specialStyle="" 
                                label="Activity Name" 
                                placeholder="i.e. 700Club_Donation_Activity" 
                                maxLength="50" 
                                required={true} 
                                value={fields.ActivityName} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.ActivityName} 
                            />
                        </li>
                        <li>
                            <InputGroup
                                type="text"
                                id="MotivationText" 
                                specialStyle="" 
                                label="Motivation Code" 
                                placeholder="i.e. 002345" 
                                maxLength="6" 
                                required={true} 
                                value={fields.MotivationText} 
                                handleInputChange={this.handleInputChange} 
                                error={errors.MotivationText} 
                            />
                        </li>
                        <li>
                            <Checkbox id="showGivingArray" checked={fields.showGivingArray} handleInputChange={this.handleInputChange} label="Show Giving Array(s)?"/>
                        </li>
                        {
                            fields.showGivingArray ? (
                                <React.Fragment>
                                    <li>
                                        <Checkbox id="monthlyOption" checked={fields.monthlyOption} handleInputChange={this.handleInputChange} label="Show Monthly Giving Options?"/>
                                    </li>
                                    { 
                                        fields.monthlyOption ? (
                                            <li>
                                                <InputGroup
                                                    type="number"
                                                    id="numMonthlyAmounts" 
                                                    specialStyle="" 
                                                    label="How many monthly gift amount options?" 
                                                    placeholder="1, 2, 3, etc" 
                                                    min={1} 
                                                    required={true} 
                                                    value={fields.numMonthlyAmounts} 
                                                    handleInputChange={this.handleInputChange} 
                                                    error={errors.numMonthlyAmounts} 
                                                />
                                            </li>
                                        ) : null
                                    }
                                    <li>
                                        <Checkbox id="singleOption" checked={fields.singleOption} handleInputChange={this.handleInputChange} label="Show Single Giving Options"/>
                                    </li>
                                    { 
                                        fields.singleOption ? (
                                            <li>
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
                                            </li>
                                        ) : null
                                    }
                                </React.Fragment>
                            ) : null;
                        }
                        <li>
                            <Checkbox id="addFunds" checked={fields.addFunds} handleInputChange={this.handleInputChange} label="Users can Select Different Funds?"/>
                        </li>
                        { 
                            fields.addFunds ? (
                                <li>
                                    <InputGroup
                                        type="number"
                                        id="numFunds" 
                                        specialStyle="" 
                                        label="How many fund options?" 
                                        placeholder="1, 2, 3, etc" 
                                        min={1} 
                                        required={true} 
                                        value={fields.numFunds} 
                                        handleInputChange={this.handleInputChange} 
                                        error={errors.numFunds} 
                                    />
                                </li>
                            ) : null
                        }
                        <li>
                            <Checkbox id="addProducts" checked={fields.addProducts} handleInputChange={this.handleInputChange} label="Users can Select Product(s)?"/>
                        </li>
                        { 
                            fields.addProducts ? (
                                <li>
                                    <InputGroup
                                        type="number"
                                        id="numProducts" 
                                        specialStyle="" 
                                        label="How many fund options?" 
                                        placeholder="1, 2, 3, etc" 
                                        min={1} 
                                        required={true} 
                                        value={fields.numProducts} 
                                        handleInputChange={this.handleInputChange} 
                                        error={errors.numProducts} 
                                    />
                                </li>
                            ) : null
                        }
                    </ul>
                </form>
            </React.Fragment>
        )
    }
}