import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import styles from './styles/index.css'

import FormButton from './FormButton'

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            k: props.k,
            list: [...props.formList],
            inputValue: props.k,
            inputDisabled: props.k ? true : false,
            error: ''
        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleEditApiKey = this.handleEditApiKey.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        const {k, formList} = await this.props.tabFunctions.getExistingFormInfo();
        this.setState((state, props) => {
            const updateK = k !== state.k
            const updateFormList = JSON.stringify(formList) !== JSON.stringify(state.formList)
           
            if (updateK && updateFormList) {
                return { k , formList, inputDisabled: true }
            } else if (updateK) {
                return { k, inputDisabled: true }
            } else if (updateFormList) {
                return { formList }
            }
        });
    }

    handleButtonClick(e, ctx) {
        e.preventDefault();
        if (ctx.type == "Edit" && ctx.name == "apiKey") {
            this.handleEditApiKey(e);
        }
        return this.props.tabFunctions.setAdminMode(e, ctx.type, ctx.val)
    }

    handleEditApiKey(e) {
        if (this.state.k) {
            // verify choice to update
        }

        this.setState({inputDisabled: true})
    }

    handleInputChange(e) {
        const target = e.target;
        let inputValue = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({inputValue});
    }
    
    render() {
        const self = this;   
        const list = this.state.list.map((el, ind)=> {
            if (el.id) {
                return (
                    <li key={`list-${ind}`} styleName="flex">
                        <div styleName="">{el.campaignName}</div>
                        <div styleName="">{el.status}</div>
                        <div styleName="">{el.creator}</div>
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
                            styleName=""
                            type="text"
                            value={this.state.inputValue}
                            disabled={this.state.inputDisabled}
                            name="apiKey"
                            onChange={this.handleInputChange}
                            placeholder="API Key assigned by Giving Services"
                            onFocus={this.handleEditApiKey}
                        />
                        <div styleName="">{this.state.error}</div>
                        <FormButton val="Update" handleClick={this.handleButtonClick} ctx={{name: "apiKey", val: '', type: 'Edit'}} />
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