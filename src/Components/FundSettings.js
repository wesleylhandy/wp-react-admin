<fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <Checkbox id="addFunds" checked={fields.addFunds} handleInputChange={this.handleInputChange} label="Users can Select Different Funds?"/>
                        </div>
                        { 
                            fields.addFunds ? (
                                <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
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
                                </div>
                            ) : null
                        }
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
                                        label="How many fund options?" 
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
                    </fieldset>