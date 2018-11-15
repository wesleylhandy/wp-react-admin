import Reactfrom 'react'

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

    handleButtonClick(ctx) {
        const fields = {...this.state.fields}, errors = {...this.state.errors}
        this.setState({submitting: true}, ()=>{
            this.props.tabFunctions.toggleBtnEnable( false )
            const currentState = JSON.stringify(fields);
            const initialState = JSON.stringify(this.state.initialState);
            for (let error in errors) {
                // data validation???
                errors[error] = ''
            }
            if (currentState != initialState) {
                const config = {...this.props.config, ...fields};
                this.props.tabFunctions.storeConfig(this.state.currentForm.id, ctx.type, config)
                .then(success=>{
                    if (success) {
                         this.setState({updated: false, saved: true, submitting: false, initialState: fields, errors}, () => {
                            this.props.tabFunctions.toggleBtnEnable( true )
                            setTimeout(() => {
                                this.setState({saved: false})
                            }, 300)
                        })
                    } else {
                        errors['formError'] = "Unable to Save"
                        this.setState({errors})
                    }
                });
            } else {
                this.setState({updated: false, saved: true, errors, submitting: false}, () => {
                    this.props.tabFunctions.toggleBtnEnable( true )
                    setTimeout(() => {
                        this.setState({saved: false})
                    }, 300)
                })
            }
        });
    }

    renderFundInputs = num => {

        const arr = Array(num).fill(null);

        return arr.map((el, ind) => {
            return (
                <fieldset key={`fundRow-${ind}`} styleName='form.fieldset__bordered'>
                    <h4>Fund {ind + 1}</h4>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-Title`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Title`}
                            maxLength={120}
                            placeholder="i.e. Wherever Needed Most" 
                            required={true} 
                            value={this.state.fields.funds[ind].Title} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].Title} 
                        />
                        <TextGroup
                            id={`funds-${ind}-FundDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Description`}
                            rows={3}
                            maxLength={512}
                            placeholder="Can include html tags, < 320 visible characters" 
                            required={true} 
                            value={this.state.fields.funds[ind].FundDescription} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].FundDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailName`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Detail Name`}
                            maxLength={32}
                            placeholder="i.e. Superbook, OrphansPromise, 700Club, etc" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailName} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailName} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojMail`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: WhiteMail SOL`}
                            maxLength={6}
                            placeholder="i.e. 043251" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailCprojMail} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailCprojMail} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailCprojCredit`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: Credit SOL`}
                            maxLength={6}
                            placeholder="i.e. 043250" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailCprojCredit} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailCprojCredit} 
                        />
                        <InputGroup
                            type="text"
                            id={`funds-${ind}-DetailDescription`} 
                            specialStyle="" 
                            label={`Fund ${ind+1}: SOL Description`}
                            maxLength={32}
                            placeholder="i.e. Orphan's Promise Vietname, Superbook Translation, etc" 
                            required={true} 
                            value={this.state.fields.funds[ind].DetailDescription} 
                            handleInputChange={this.handleInputChange} 
                            error={this.state.errors.funds[ind].DetailDescription} 
                        />
                    </div>
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <div style={{maxWidth: "100px"}}>
                            <FormButton val="Remove" handleClick={props.handleButtonClick} ctx={{name: "funds", val: {ind}, type: 'Remove'}} />
                        </div>
                    </div>
                </fieldset>
            )
        })
    }
        
    return (
        <React.Fragment>
            <form onSubmit={(e)=>{e.preventDefault(); this.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
                <h3>Configure Fund Setttings</h3>
                <fieldset styleName="form.fieldset">
                    <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                        <Checkbox id="addFunds" checked={fields.addFunds} handleInputChange={this.handleInputChange} label="Users can Select Different Funds?"/>
                    </div>
                    { this.renderFundInputs(fields.numFunds) }
                    { 
                        fields.addFunds ? (
                            <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                                <div style={{maxWidth: "170px"}}>
                                    <FormButton val="Add Setting" handleClick={this.handleButtonClick} ctx={{name: "funds", val: '', type: 'Add'}} />
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