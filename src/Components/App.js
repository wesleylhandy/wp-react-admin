import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { callApi } from './helpers/fetch-helpers'

import MetaTabs from './Metatabs.js'
import FormOptionsTabs from './FormOptionsTabs'
import Spinner from './Spinner'

import main from './styles/main.css'
import StyleOptionsTabs from './StyleOptionsTabs';



class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            base: (props.mode == 'local' ? 'http://givingwp.dmgdev.cbn.local' : ''),
            btnsEnabled: false,
            configured: false,
            permissible: false,
            adminMode: "List",
            currentFormId: -1,
            viewMode: "Settings",
            styleMode: "Colors",
            formConfig: {},
            cssConfig: {},
            emailConfig: {},
            user: {},
            k: '',
            formList: [],
            options: {
                credentials: "include",
                method: "GET",
                headers: {
                    "X-WP-Nonce": props.wpnonce,
                    "Content-Type": 'application/json',
                }
            }
        }
        this.handleAdminMode = this.handleAdminMode.bind(this);
        this.handleViewMode = this.handleViewMode.bind(this);
        this.handleStyleMode = this.handleStyleMode.bind(this);
        this.getExistingFormInfo = this.getExistingFormInfo.bind(this)
        this.handleAPIErrors = this.handleAPIErrors.bind(this)
        this.storeConfig = this.storeConfig.bind(this)
        this.setApiKey = this.setApiKey.bind(this)
    }

    async componentDidMount(){
        try {
            const profile = await callApi(`${this.state.base}/wp-json/wp/v2/users/me?context=edit`)
            const primaryRole = profile.roles && profile.roles.length ? profile.roles[0] : '';
            const isAdmin = primaryRole.toLowerCase() === "administrator"
            const user = {id: profile.id, username: profile.username, email: profile.email}
            this.setState({configured: true, permissible: isAdmin, user, btnsEnabled: true})
        } catch(err) {
            if (this.props.mode == 'local') {
                this.setState({configured: true, permissible: true, btnsEnabled: true, user: {id: 1, username: 'dmg', email: 'wesley.handy@cbn.org'}})
            } else {
                this.handleAPIErrors(err);
            }
        }
    }

    handleAdminMode(e, adminMode, id=""){
        e.preventDefault();
        if (adminMode === "Edit") {
            this.setState({btnsEnabled: false}, async ()=> {
                try {
                    const result = await callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/single/${id}`, this.state.options)
                    let {formConfig, cssConfig, emailConfig}  = result;
                    formConfig = JSON.parse(formConfig), cssConfig = JSON.parse(cssConfig), emailConfig = JSON.parse(emailConfig)
                    // console.log({formConfig, cssConfig, emailConfig})
                    this.setState({formConfig, cssConfig, emailConfig, currentFormId: id, adminMode, btnsEnabled: true})
                } catch(err) {
                    this.handleAPIErrors(err)
                }
            })
        } else {
            this.setState({adminMode})
        }
    }

    handleViewMode(e, viewMode){
        e.preventDefault();
        // console.log({viewMode})
        this.setState({viewMode})
    }

    handleStyleMode(e, styleMode){
        e.preventDefault();
        // console.log({styleMode})
        this.setState({styleMode})
    }

    getExistingFormInfo() {
        let k, formList;
        this.setState({btnsEnabled: false}, async ()=> {
            try {
                [k, formList] = await Promise.all([callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/api`, this.state.options), callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/list/all`, this.state.options)])
                this.setState({k: k.key, formList, btnsEnabled: true})
            } catch (err) {

                this.handleAPIErrors(err)
                this.setState({btnsEnabled: true})
            }
        })
        if ( !k ) {
            k = {key : ""}
            formList=[]
        }
        return {k: k.key, formList}
    }

    async storeConfig(e, id, type, data, method) {
        e.preventDefault()
        try {
            const endpoint = method === "POST" ? 'create' : `${id}`
            const { options } = this.state;
            options.method = method;
            options.body = JSON.stringify({[type]: data});
            const completed = await callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/${endpoint}`, options);
            if (completed) {
                this.setState({[type]: data})
            }
            return true;
        } catch(err) {
            this.handleAPIErrors(err)
            return false;
        }

    }

    async setApiKey(e, key, method) {
        e.preventDefault();
        try {
            const { options } = this.state;
            options.method = method;
            options.body = JSON.stringify({api_key: key})
            const completed = await callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/api`, options);
            if (completed) {
                this.setState({k: key})
            }
            return true;
        } catch(err) {
            if (err.message.includes("Duplicate value.")) {
                console.error({setApiKeyErr: err})
                return true;
            } else {
                this.handleAPIErrors(err)
                return false
            }
        }
    }

    handleAPIErrors(err) {
        console.error({err});
        alert('There was an error connecting with Wordpress.\nPlease verify that you are still connected to your wordpress installation and logged in.\nIf so, please contact Wesley.Handy@cbn.org with your issues');
    }

    render() {
        const {permissible, configured, btnsEnabled, ...state} = this.state
        return ( 
            <div styleName='main.page-wrapper' id="react-page-top"> 
                {
                    configured && permissible ? (
                        <React.Fragment>
                            <MetaTabs 
                                k={state.k} 
                                formList={state.formList} 
                                adminMode={state.adminMode} 
                                enabled={btnsEnabled} 
                                setAdminMode={this.handleAdminMode} 
                                getExistingFormInfo={this.getExistingFormInfo} 
                                setApiKey={this.setApiKey}
                            />
                            <FormOptionsTabs 
                                adminMode={state.adminMode} 
                                viewMode={state.viewMode} 
                                formConfig={state.formConfig}
                                emailConfig={state.emailConfig}
                                currentFormId={state.currentFormId}
                                enabled={btnsEnabled} 
                                setViewMode={this.handleViewMode}
                                storeConfig={this.storeConfig}
                            />
                            <StyleOptionsTabs
                                adminMode={state.adminMode} 
                                viewMode={state.viewMode} 
                                styleMode={state.styleMode}
                                cssConfig={state.cssConfig}
                                currentFormId={state.currentFormId}
                                enabled={btnsEnabled} 
                                setStyleMode={this.handleStyleMode} 
                                storeConfig={this.storeConfig}
                            />
                        </React.Fragment>
                    ) : configured && !permissible ? (
                        <h1 styleName="main.not-permissible-heading">You are not Authorized to View These Settings</h1>
                    ) : (
                        <Spinner />
                    )
                }

            </div>
        )
    }
}

export default hot(module)(App)