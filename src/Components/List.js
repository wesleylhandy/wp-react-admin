import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import styles from './styles/index.css'

import FormButton from './FormButton'
import swal from 'sweetalert'

export default class List extends Component {
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
        const list = this.state.list.map((el, ind)=> {
            if (el.id) {
                return (
                    <li key={`list-${ind}`} styleName="flex">
                        <div styleName="">{el.id}</div>
                        <div styleName="">{el.form_name}</div>
                        <div styleName="">{el.form_status}</div>
                        <FormButton val="Edit" handleClick={self.handleButtonClick} ctx={{name: "campaign", val: el.id, type: 'Edit'}} />
                        <FormButton val="Delete" handleClick={self.handleButtonClick} ctx={{name: "campaign", val: el.id, type: 'Delete'}} />
                    </li>
                )
            } else return <li></li>
        });
        return (
            <React.Fragment>
                <form styleName="" onSubmit={ e => e.preventDefault() }>
                    <div styleName="">
                        <label htmlFor="apiKey">ApiKey</label>
                        <input 
                            styleName={this.state.stored ? "" : ""}
                            type="text"
                            value={this.state.inputValue}
                            disabled={this.state.inputDisabled}
                            name="apiKey"
                            onChange={this.handleInputChange}
                            placeholder="API Key assigned by Giving Services"
                            onFocus={this.handleEditApiKey}
                            ref={this.keyField}
                        />
                        <div styleName="">{this.state.error}</div>
                        <FormButton val="Update" handleClick={this.handleButtonClick} ctx={{name: "apiKey", val: '', type: 'Edit'}} />
                        { 
                            this.state.allowEdit && !this.state.error ? (
                                <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: 'apiKey', val: '', type: 'Save'}} />
                            ) : null
                        }
                    </div>
                </form>
                <ul styleName="">
                    {list}
                </ul>
                <FormButton val="Add" handleClick={this.handleButtonClick} ctx={{name: "campaign", val: '', type: 'Add'}} />
            </React.Fragment>
        )
    }
}