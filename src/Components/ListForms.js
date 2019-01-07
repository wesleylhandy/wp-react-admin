import React, {Component} from 'react'

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
            submitting: false,
            k: props.k || '',
            base: props.base,
            list: [...props.formList],
            inputValue: props.k || '',
            inputDisabled: props.k ? true : false,
            error: '',
            allowEdit: props.k ? false : true,
            saveMethod: 'POST',
            stored: false
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleEditApiKey = this.handleEditApiKey.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        this.props.tabFunctions.getExistingFormInfo();
    }

    static getDerivedStateFromProps(props, state) {
        let {k} = props;
        k = k ? k : '';
        const updateK = state.k !== k
        const updateFormList = JSON.stringify(props.formList) !== JSON.stringify(state.list)
        if (updateK && updateFormList) {
            return { k , inputValue: k , list: [...props.formList], inputDisabled: true, allowEdit: false, saveMethod: 'PUT' }
        } else if (updateK) {
            return { k, inputValue: k, inputDisabled: true, allowEdit: false, saveMethod: 'PUT'}
        } else if (updateFormList) {
            return { list: props.formList, submitting: false }
        } else {
            return {}
        }
    }

    handleButtonClick({type, name, val}) {
        const { toggleBtnEnable, setApiKey, deleteForm, setAdminMode} = this.props.tabFunctions
        this.setState({submitting: true}, async ()=>{
            toggleBtnEnable( false )
            if (type == "Edit" && name == "apiKey") {
                this.handleEditApiKey();
                this.setState({submitting: false}, ()=> toggleBtnEnable( true ))
            } else if (type == "Save" && name == "apiKey") {
                const {saveMethod, inputValue} = this.state
                setApiKey(inputValue, saveMethod).then(success=>{
                    if (success) {
                        this.setState({stored: true, inputDisabled: true, allowEdit: false, submitting: false})
                    } else {
                        this.setState({error: "Unable to Save", submitting: false})
                    }
                    toggleBtnEnable( true )
                });
                
            } else if (type == "Delete") {
                try {
                    const willDelete = await swal({
                        title: "Are you sure?",
                        text: 'This will remove all references to this form in the Database, are you certain you want to delete?',
                        icon: "warning",
                        buttons: true,
                        dangerMode: true
                    })
                    if (willDelete) {
                        try {
                            const deleted = await deleteForm( val )
                        } catch(err) {
                            console.error({err})
                        }
                    }
                } catch(err) {
                    console.error({err})
                }
                toggleBtnEnable( true )
            } else {
                toggleBtnEnable( true )
                setAdminMode(type, val)
            }
        })
    }

    async handleEditApiKey() {
        const {inputValue, allowEdit} = this.state
        if (inputValue && !allowEdit) {
            try {
                let inputDisabled = true;
                const willEdit = await swal({
                    title: "Are you sure?",
                    text: 'Changes to this field will overwrite the existing stored value, which you will not be able to recover unless you have stored the value elsewhere.',
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                // console.log({willEdit})
                if (willEdit) {
                    inputDisabled = false;
                } 
                this.setState({inputDisabled, allowEdit: inputDisabled ? false : true})
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
                <form onSubmit={(e)=>e.preventDefault()}>
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
                                <div styleName="error.error">{this.state.error}</div>
                            </div>
                        
                            <FormButton val="Update" handleClick={this.handleButtonClick} ctx={{name: "apiKey", val: '', type: 'Edit'}} submitting={this.state.submitting}/>
                            { 
                                this.state.allowEdit && !this.state.error ? (
                                    <FormButton val="Save" handleClick={this.handleButtonClick} ctx={{name: 'apiKey', val: '', type: 'Save'}} submitting={this.state.submitting}/>
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
                            <td colSpan="4" styleName="form.table-row__cells">
                                <div styleName="flex.flex flex.flex-row flex.flex-center flex.flex-axes-center">
                                    <FormButton val="Add New Form" handleClick={this.handleButtonClick} ctx={{name: "campaign", val: '', type: 'Add'}} submitting={this.state.submitting}/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </React.Fragment>
        )
    }
}