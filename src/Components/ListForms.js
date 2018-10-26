import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import flex from './styles/flex.css'
import input from './styles/input.css'
import error from './styles/error.css'
import form from './styles/form.css'

import FormButton from './FormButton'
import swal from 'sweetalert'

export default class ListForms extends Component {
    constructor(props) {
        super(props);
        this.keyField = React.createRef();
        this.state = {
            base: props.base,
            k: props.k,
            list: [...props.formList],
            inputValue: props.k,
            inputDisabled: props.k != '' ? false : true,
            error: '',
            allowEdit: props.k != '' ? false : true,
            saveMethod: 'POST',
            stored: false
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleEditApiKey = this.handleEditApiKey.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        const {k, formList} = await this.props.tabFunctions.getExistingFormInfo();
        this.setState((state, props) => {
            const updateK = state.k !== k
            const updateFormList = JSON.stringify(formList) !== JSON.stringify(state.formList)
            // console.log({k, formList, state, props, updateK, updateFormList})
            if (updateK && updateFormList) {
                return { k, inputValue: k , list: [...formList], inputDisabled: true, allowEdit: false, saveMethod: 'PUT' }
            } else if (updateK) {
                return { k, inputValue: k, inputDisabled: true, allowEdit: false, saveMethod: 'PUT'}
            } else if (updateFormList) {
                return { formList }
            }
        });
    }

    handleButtonClick(e, ctx) {
        if (ctx.type == "Edit" && ctx.name == "apiKey") {
            this.handleEditApiKey(e);
        } else if (ctx.type == "Save" && ctx.name == "apiKey") {
            const method = this.state.saveMethod
            this.props.tabFunctions.setApiKey(e, this.state.inputValue, method).then(success=>{
                if (success) {
                    this.setState({stored: true, inputDisabled: true, allowEdit: false})
                } else {
                    this.setState({error: "Unable to Save"})
                }
            });
            
        } else {
            e.preventDefault();
            return this.props.tabFunctions.setAdminMode(e, ctx.type, ctx.val)
        }
    }

    async handleEditApiKey(e) {
        if (this.state.inputValue && !this.state.allowEdit) {
            try {
                let inputDisabled = true;
                const willEdit = await swal({
                    title: "Are you sure?",
                    text: 'Changes to this field will overwrite the existing stored value, which you will not be able to recover unless you have stored the value elsewhere.',
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                if (willEdit) {
                    inputDisabled = false;
                } 
                this.setState({inputDisabled, allowEdit: true})
                this.keyField.current.focus()
                this.keyField.current.setSelectionRange(0, 1000);
            } catch (err) {
                console.error({err})
            }
        }
    }

    handleInputChange(e) {
        const target = e.target;
        let inputValue = target.type === 'checkbox' ? target.checked : target.value.trim();
        let {error} = this.state;
        if (/^([0-9A-Fa-f\-])+$/.test(inputValue)) {
            error = '';
        } else {
            error = 'Invalid Characters';
        }
        this.setState({inputValue, error})
    }
    
    render() {
        const self = this;   
        const tableRows = this.state.list.map((el, ind)=> {
            if (el.id) {
                return (
                    <tr key={`list-${ind}`} styleName="form.table-row">
                        <td styleName="form.table-row__cells">{el.id}</td>
                        <td styleName="form.table-row__cells">{el.form_name}</td>
                        <td styleName="form.table-row__cells">{el.form_status}</td>
                        <td styleName="form.table-row__cells">
                            <div styleName="flex.flex flex.flex-row flex.flex-axes-center">
                                <FormButton val="Edit" handleClick={self.handleButtonClick} ctx={{name: "campaign", val: el.id, type: 'Edit'}} />
                                <FormButton val="Delete" handleClick={self.handleButtonClick} ctx={{name: "campaign", val: el.id, type: 'Delete'}} />
                            </div>
                        </td>
                    </tr>
                )
            } else return null
        });
        return (
            <React.Fragment>
                <form onSubmit={ e => e.preventDefault() }>
                    <fieldset styleName='form.fieldset'>
                        <div styleName="form.form-row flex.flex flex.flex-row flex.flex-axes-center">
                            <div id="form-field-apiKey" styleName="input.form-group flex.flex-grow">
                                <label htmlFor="apiKey">ApiKey</label>
                                <input 
                                    id="apiKey"
                                    styleName={`input.form-control${this.state.error ? " input.error" : ""}${this.state.stored ? " input.stored" : ""}`}
                                    type="text"
                                    value={this.state.inputValue}
                                    disabled={this.state.inputDisabled}
                                    name="apiKey"
                                    required={true}
                                    onChange={this.handleInputChange}
                                    placeholder="API Key assigned by Giving Services"
                                    onFocus={this.handleEditApiKey}
                                    aria-invalid={this.state.error ? true : false} 
                                    ref={this.keyField}
                                />
                                <div styleName="">{this.state.error}</div>
                            </div>
                        
                            <FormButton val="Update" handleClick={this.handleButtonClick} ctx={{name: "apiKey", val: '', type: 'Edit'}} />
                            { 
                                this.state.allowEdit && !this.state.error ? (
                                    <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: 'apiKey', val: '', type: 'Save'}} />
                                ) : null
                            }
                        </div>
                    </fieldset>
                </form>
                <table styleName='form.table'>
                    <thead styleName="form.table-head">
                        <tr styleName='form.table-row'>
                            <th styleName="form.table-row__headers">
                                ID
                            </th>
                            <th styleName="form.table-row__headers">
                                Campaign Name
                            </th>
                            <th styleName="form.table-row__headers">
                                Status
                            </th>
                            <th styleName="form.table-row__headers">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                        <tr styleName="form.table-row">
                            <td styleName="form.table-row__cells"></td>
                            <td styleName="form.table-row__cells"></td>
                            <td styleName="form.table-row__cells"></td>
                            <td styleName="form.table-row__cells">
                                <div styleName="flex.flex flex.flex-row flex.flex-axes-center">
                                    <FormButton val="Add New Form" handleClick={this.handleButtonClick} ctx={{name: "campaign", val: '', type: 'Add'}} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </React.Fragment>
        )
    }
}