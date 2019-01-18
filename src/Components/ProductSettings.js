import React from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import FormButton from './FormButton'
import SaveButton from './SaveButton'
import Checkbox from './Checkbox'
import InputGroup from './InputGroup'
import TextGroup from './TextGroup'
import withFormConfigHandling from './withFormConfigHandling'

const ProductSettings = ({fields, errors, handleInputChange, handleButtonClick, saved, updated, submitting}) => {

    const renderProductInputs = num => {

        const arr = Array(num).fill(null);

        return arr.map((el, ind)=>{
            return (
                <fieldset styleName="form.fieldset__bordered" key={`productRow-${ind}`}>
                    <h4>Product {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-wrap">
                        <InputGroup
                            type="text"
                            id={`products-${ind}-productTitle`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Title`}
                            maxLength={120}
                            placeholder="i.e. To Life DVD" 
                            required={true} 
                            value={fields.products[ind].productTitle} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].productTitle} 
                        />
                        <TextGroup
                            id={`products-${ind}-productMessage`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Description`}
                            maxLength={512}
                            rows={3}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={false} 
                            value={fields.products[ind].productMessage} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].productMessage} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center flex.flex-wrap">
                        <InputGroup
                            type="text"
                            id={`products-${ind}-productImgUrl`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Product Image URL`}
                            maxLength={256}
                            placeholder="i.e. https://www.cbn.com/giving/special/tolife/assets/images/dvd-img.png" 
                            required={false} 
                            value={fields.products[ind].productImgUrl} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].productImgUrl} 
                        />
                        <InputGroup
                            type="text"
                            id={`products-${ind}-PledgeAmount`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Pledge Amount`}
                            maxLength={7}
                            placeholder="i.e. 15"
                            required={true} 
                            value={fields.products[ind].PledgeAmount} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].PledgeAmount} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center flex.flex-wrap">

                        <InputGroup
                            type="text"
                            id={`products-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Detail Name`}
                            maxLength={15}
                            placeholder="i.e. CC01" 
                            required={true} 
                            value={fields.products[ind].DetailName} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].DetailName} 
                        />
                        <InputGroup
                            type="text"
                            id={`products-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: WhiteMail SOL`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={fields.products[ind].DetailCprojMail} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].DetailCprojMail} 
                        />
                        <InputGroup
                            type="text"
                            id={`products-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: Credit SOL`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={fields.products[ind].DetailCprojCredit} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].DetailCprojCredit} 
                        />
                        <InputGroup
                            type="text"
                            id={`products-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Product ${ind+1}: SOL Description`}
                            maxLength={40}
                            placeholder="i.e. Orphan's Promise Vietnam, Superbook Translation, etc" 
                            required={true} 
                            value={fields.products[ind].DetailDescription} 
                            handleInputChange={handleInputChange} 
                            error={errors.products[ind].DetailDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <div>
                            <FormButton val="Remove" handleClick={handleButtonClick} ctx={{name: "products", val: ind, type: 'Remove'}} />
                        </div>
                    </div>
                </fieldset>
            )
        })
    }

    return (
        <React.Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Product Setttings</h3>
                <p styleName="form.form-info">Note: Currently, monthly gifts cannot be processed together with product orders. You may need two different giving pages to handle these individual needs.</p>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="addProducts" checked={fields.addProducts} handleInputChange={handleInputChange} label="Users can Select Product(s)?"/>
                    </div>

                    { renderProductInputs(fields.numProducts) }

                    { 
                        fields.addProducts &&
                            <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                <div style={{maxWidth: "170px"}}>
                                    <FormButton val="Add Setting" handleClick={handleButtonClick} ctx={{name: "products", val: '', type: 'Add'}} />
                                </div>
                            </div>
                    }

                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="addGift-display" checked={fields.additionalGift.display} handleInputChange={handleInputChange} label="Prompt Donors for a special additional gift?"/>
                    </div>

                    {
                        fields.additionalGift.display &&
                            <fieldset styleName="form.fieldset__bordered">
                                <h4>Additional Gift</h4>
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-wrap">         
                                    <InputGroup
                                        type="text"
                                        id={`addGift-DetailName`} 
                                        specialStyle="" 
                                        label={`Additional Gift: Detail Name`}
                                        maxLength={15}
                                        placeholder="i.e. SGOrphansPromise" 
                                        required={true} 
                                        value={fields.additionalGift.DetailName} 
                                        handleInputChange={handleInputChange} 
                                        error={errors.additionalGift.DetailName} 
                                    />
                                    <TextGroup
                                        type="text"
                                        id={`addGift-additionalGiftMessage`} 
                                        specialStyle="" 
                                        label={`Message/Appeal for additional gift`}
                                        maxLength={512}
                                        rows={3}
                                        placeholder="Please consider a special gift to CBN Ministries" 
                                        required={true} 
                                        value={fields.additionalGift.additionalGiftMessage} 
                                        handleInputChange={handleInputChange} 
                                        error={errors.additionalGift.additionalGiftMessage} 
                                    />  
                                </div>
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-wrap">
                                    <InputGroup
                                        type="text"
                                        id={`addGift-DetailCprojMail`} 
                                        specialStyle="" 
                                        label={`Additional Gift: WhiteMail SOL`}
                                        maxLength={6}
                                        placeholder="i.e. 043251" 
                                        required={true} 
                                        value={fields.additionalGift.DetailCprojMail} 
                                        handleInputChange={handleInputChange} 
                                        error={errors.additionalGift.DetailCprojMail} 
                                    />
                                    <InputGroup
                                        type="text"
                                        id={`addGift-DetailCprojCredit`} 
                                        specialStyle="" 
                                        label={`Additional Gift: Credit SOL`}
                                        maxLength={6}
                                        placeholder="i.e. 043250" 
                                        required={true} 
                                        value={fields.additionalGift.DetailCprojCredit} 
                                        handleInputChange={handleInputChange} 
                                        error={errors.additionalGift.DetailCprojCredit} 
                                    />
                                    <InputGroup
                                        type="text"
                                        id={`addGift-DetailDescription`} 
                                        specialStyle="" 
                                        label={`Additional Gift: SOL Description`}
                                        maxLength={40}
                                        placeholder="i.e. Orphan's Promise Vietnam, Superbook Translation, etc" 
                                        required={true} 
                                        value={fields.additionalGift.DetailDescription} 
                                        handleInputChange={handleInputChange} 
                                        error={errors.additionalGift.DetailDescription} 
                                    />
                                </div>
                            </fieldset>
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
        </React.Fragment>
    )
}

export default withFormConfigHandling(ProductSettings);