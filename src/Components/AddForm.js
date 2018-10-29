import React, {Component} from 'react'

import flex from './styles/flex.css'
import input from './styles/input.css'
import error from './styles/error.css'
import form from './styles/form.css'

import FormButton from './FormButton'
import InputGroup from './InputGroup'
import swal from 'sweetalert'

export default class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updated: false,
            saved: false,
            form_name: '',
            created_by: props.user.id
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleButtonClick(e, ctx) {
        this.props.tabFunctions.toggleBtnEnable( false )
        this.props.tabFunctions.createForm(e, ctx.val, this.state["created_by"]).then(id=>{
            if (id) {
                this.setState({saved: true}, () => {
                    this.props.tabFunctions.toggleBtnEnable( true )
                    this.props.setAdminMode("Edit", id);
                })
            } else {
                this.setState({error: "Unable to Save"})
            }
        });
    }

    
    handleInputChange(e) {
        const target = e.target;
        let inputValue = target.type === 'checkbox' ? target.checked : target.value.trim();
        let {error} = this.state;
        const updated = inputValue ? true : false
        this.setState({form_name: inputValue, error, updated}, ()=> this.props.tabFunctions.toggleBtnEnable( updated ? false : true ))
    }
    
    render() {
        const {fields, errors} = this.state;
        return (
            <React.Fragment>
                <form>
                    <h3>Add New Form</h3>
                    <fieldset styleName="form.fieldset">
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
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
                        </div>
                    </fieldset>
                    <fieldset styleName="form.fieldset">
                        <div style={{maxWidth: "88px"}}>
                            <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: "create", val: fields.form_name, type: 'form_name'}} />
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>

        )
    }
}