import React, {Component} from 'react'

import form from './styles/form.css'
import flex from './styles/flex.css'

import SaveButton from './SaveButton'
import Checkbox from './Checkbox';

export default class NameSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: props.editMode,
            updated: false,
            saved: false,
            initialState: {
                ...props.defaultValues
            },
            fields: {
                getMiddleName: props.editMode ? props.config.getMiddleName : false,
                getSuffix: props.editMode ? props.config.getSuffix: false,
                getSpouseInfo: props.editMode ? props.config.getSpouseInfo : false,
                getPhone: props.editMode ? props.config.getPhone : true,
                international: props.editMode ? props.config.international : true,
                shipping: props.editMode ? props.config.shipping: true
            },
            formError: '',
            currentForm: props.currentForm,
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleUnload=this.handleUnload.bind(this)
    }

        // don't let users leave page without warning
        componentDidMount() {
            window.addEventListener('beforeunload', this.handleUnload)
        }
        // remove event listeners on unmount
        componentWillUnmount() {
            window.removeEventListener('beforeunload', this.handleUnload)
        }
    
        handleUnload(e) {
            // console.log({updated: this.state.updated, saved: this.state.saved})
            if (this.state.updated && !this.state.saved) {
                e.preventDefault();
                e.returnValue = "Are you sure you want to go back?\n You may lose all your changes to this page."
                return "Are you sure you want to go back?\n You may lose all your changes to this page."
            }
            return void (0);
        }


    handleButtonClick(ctx) {
        const fields = {...this.state.fields};
        this.setState({submitting: true}, ()=>{
            this.props.tabFunctions.toggleBtnEnable( false )
            const currentState = JSON.stringify(fields);
            const initialState = JSON.stringify(this.state.initialState);
            if (currentState != initialState) {
                const config = {...this.props.config, ...fields};
                this.props.tabFunctions.storeConfig(this.state.currentForm.id, ctx.type, config)
                .then(success=>{
                    if (success) {
                        this.setState({updated: false, saved: true, submitting: false, initialState: fields, formError: ''}, () => {
                            this.props.tabFunctions.toggleBtnEnable( true )
                            setTimeout(() => {
                                this.setState({saved: false})
                            }, 300)
                        })
                    } else {
                        this.setState({formError: "Unable to Save"})
                    }
                });
            } else {
                this.setState({updated: false, saved: true, submitting: false}, () => {
                    this.props.tabFunctions.toggleBtnEnable( true )
                    setTimeout(() => {
                        this.setState({saved: false})
                    }, 300)
                })
            }
        });
    }

    handleInputChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const fields = {...this.state.fields}
        fields[name] = value;
        const updated = JSON.stringify(fields) !== JSON.stringify(this.state.initialState)
        // console.log({updated, value, fields})
        this.setState({ fields, updated }, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ));
    }

 
    render() {
        const { fields } = this.state;
        return (
            <React.Fragment>
                <form onSubmit={(e)=>{e.preventDefault(); this.handleButtonClick({name: "store", val: '', type: 'form_setup'})}}>
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
                            <SaveButton 
                                handleClick={this.handleButtonClick} 
                                submitting={this.state.submitting} 
                                ctx={{name: "store", val: '', type: 'form_setup'}} 
                                error={this.state.formError} 
                                formMsg={this.state.updated && !this.state.saved ? "Changes require saving": ''}
                            />
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>

        )
    }
}