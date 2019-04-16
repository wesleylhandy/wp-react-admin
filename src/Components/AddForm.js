import React, {Component, Fragment} from 'react'

import flex from './styles/flex.css'
import input from './styles/input.css'
import error from './styles/error.css'
import form from './styles/form.css'

import FormButton from './FormButton'
import InputGroup from './InputGroup'

export default class AddForm extends Component {
    constructor(props) {
        super(props);
        // console.log({props})
        this.state = {
            submitting: false,
            updated: false,
            saved: false,
            form_name: '',
            created_by: props.user.id,
            error: ''
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleButtonClick(ctx) {
        this.props.tabFunctions.toggleBtnEnable( false )
        this.setState({submitting: true}, ()=> {
                   
            this.props.tabFunctions.createForm(ctx.val, this.state["created_by"])
            .then(id=>{
                if (id) {
                    this.setState({saved: true, submitting: false}, () => {
                        this.props.tabFunctions.toggleBtnEnable( true )
                        this.props.tabFunctions.setAdminMode("Edit", id);
                    })
                } else {
                    this.setState({saved: false, submitting: false, error: "Make sure this is a unique form name"}, () => {
                        this.props.tabFunctions.toggleBtnEnable( true )
                    })
                }
            })
            .catch(err=>{
                this.setState({submitting: false}, ()=> {
                    console.error(err)
                });
            });
        });
    }

    
    handleInputChange(e) {
        const target = e.target;
        let inputValue = target.type === 'checkbox' ? target.checked : target.value.trim();
        let {error} = this.state;
        error = ''
        const updated = inputValue ? true : false
        this.setState({form_name: inputValue, error, updated})
    }
    
    render() {
        return (
            <Fragment>
                <form onSubmit={(e)=>{e.preventDefault(); this.handleButtonClick({name: "create", val: this.state.form_name, type: 'form_name'})}}>
                    <h3>Add New Form</h3>
                    <p styleName="form.form-info">Whenever you add a new giving form, please submit the Campaign Name to Digital Media so that your form can connect to the API.</p>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <InputGroup
                                type="text"
                                id="form_name" 
                                specialStyle="" 
                                label="Campaign Name" 
                                placeholder="i.e. Giving, or End-of-Year" 
                                maxLength="256" 
                                required={true} 
                                value={this.state.form_name} 
                                handleInputChange={this.handleInputChange} 
                                error={this.state.error}
                            />
                        </div>
                    </fieldset>
                    <p styleName="form.form-info">For security purposes, if avoidable, please use a campaign name that differs from the slug of the page where it will be hosted.</p>
                    <fieldset styleName="form.fieldset">
                        <div style={{maxWidth: "88px"}}>
                            <FormButton 
                                val="Save" 
                                handleClick={this.handleButtonClick} 
                                ctx={{name: "create", val: this.state.form_name, type: 'form_name'}}
                                submitting={this.state.submitting}
                            />
                        </div>
                    </fieldset>
                </form>
            </Fragment>

        )
    }
}