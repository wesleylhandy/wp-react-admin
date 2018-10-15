import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { callApi } from './helpers/fetch-helpers'

import MetaTabs from './Metatabs.js'
import FormOptionsTabs from './FormOptionsTabs'
import Spinner from './Spinner'

import styles from './styles/index.css'

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            configured: false,
            permissible: false,
            adminMode: "List",
            viewMode: "Settings",
            formConfig: {},
            cssConfig: {},
            wpnonce: props.wpnonce,
            user: {},
            k: '',
            formList: []
        }
        this.handleAdminMode = this.handleAdminMode.bind(this);
        this.handleViewMode = this.handleViewMode.bind(this);
        this.getExistingFormInfo = this.getExistingFormInfo.bind(this)
        this.handleAPIErrors = this.handleAPIErrors.bind(this)
        this.storeConfig = this.storeConfig.bind(this)
    }

    async componentDidMount(){
        try {
            const profile = await callApi(`/wp-json/wp/v2/users/me?_nonce=${this.state.nonce}&context=edit`)
            const primaryRole = profile.roles && profile.roles.length ? profile.roles[0] : '';
            const isAdmin = primaryRole.toLowerCase() === "administrator"
            const user = {id: profile.id, username: profile.username, email: profile.email}
            console.log({primaryRole, isAdmin, user})
            this.setState({configured: true, permissible: isAdmin, user})
        } catch(err) {
            this.handleAPIErrors(err);
        }
    }

    async handleAdminMode(e, adminMode, id=""){
        e.preventDefault();
        if (adminMode === "Edit") {
            try {
                const {formConfig, cssConfig}  = await callApi(`/wp-json/cbngiving/v1/admin/forms/single/${id}?_nonce=${this.state.nonce}`)
                this.setState({formConfig, cssConfig})
            } catch(err) {
                this.handleAPIErrors(err)
            }
        }
        this.setState({adminMode})
    }

    handleViewMode(e, viewMode){
        e.preventDefault();
        this.setState({viewMode})
    }

    async getExistingFormInfo() {
        let k, formList;
        try {
            [k, formList] = await Promise.all([callApi('/wp-json/cbngiving/v1/admin/forms/api'), callApi('/wp-json/cbngiving/v1/admin/forms/list/all')])
            this.setState({key, formList})
        } catch (err) {
            this.handleAPIErrors(err)
        }
        return {k, formList}
    }

    async storeConfig(e, type, data) {
        e.preventDefault()


    }

    handleAPIErrors(err) {
        console.error({err});
        alert('There was an error connecting with Wordpress.\nPlease verify that you are still connected to your wordpress installation and logged in.\nIf so, please contact Wesley.Handy@cbn.org with your issues');
    }

    render() {
        const {permissible, configured, ...state} = this.state
        return ( 
            <div styleName='page-wrapper' id="react-page-top"> 
                {
                    configured && permissible ? (
                        <React.Fragment>
                            <MetaTabs {...state} setAdminMode={this.handleAdminMode} getExistingFormInfo={this.getExistingFormInfo} />
                            <FormOptionsTabs {...state} setViewMode={this.handleViewMode} storeConfig={this.storeConfig}/>
                        </React.Fragment>
                    ) : configured && !permissible ? (
                        <h1 styleName="not-permissible-heading">You are not Authorized to View These Settings</h1>
                    ) : (
                        <Spinner />
                    )
                }

            </div>
        )
    }
}

export default hot(module)(App)