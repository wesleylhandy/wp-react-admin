import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { callApi } from './helpers/fetch-helpers'

import MetaTabs from './Metatabs.js'
import FormOptionsTabs from './FormOptionsTabs'
import Spinner from './Spinner'

import main from './styles/main.css'
import StyleOptionsTabs from './StyleOptionsTabs'

import {getFontInfo} from './helpers/getFontInfo'

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            base: (props.mode == 'local' ? 'http://givingwp.dmgdev.cbn.local' : ''),
            btnsEnabled: false,
            configured: false,
            permissible: false,
            adminMode: "List",
            currentForm: {
                id: -1,
                form_name: '',
                form_status: ''
            },
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
            },
            styleSettings: {
                errors: {},
                fields: {},
                updated: false,
                saved: false,
                submitting: false
            }
        }
        this.handleAdminMode = this.handleAdminMode.bind(this);
        this.handleViewMode = this.handleViewMode.bind(this);
        this.handleStyleMode = this.handleStyleMode.bind(this);
        this.getExistingFormInfo = this.getExistingFormInfo.bind(this)
        this.handleAPIErrors = this.handleAPIErrors.bind(this)
        this.storeConfig = this.storeConfig.bind(this)
        this.setApiKey = this.setApiKey.bind(this)
        this.toggleBtnEnable = this.toggleBtnEnable.bind(this)
        this.createForm = this.createForm.bind(this)
        this.handleStyleButtonClick = this.handleStyleButtonClick.bind(this)
        this.handleStyleInputChange = this.handleStyleInputChange.bind(this)
    }

    async componentDidMount(){
        try {
            const profile = await callApi(`${this.state.base}/wp-json/wp/v2/users/me?context=edit`, this.state.options)
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

    /**
     * 
     * @param {String} adminMode - "List, Edit, or Add"
     * @param {Number} id - WPDB ID of form being edited
     */
    handleAdminMode(adminMode, id=""){
        if (adminMode === "Edit") {
            this.setState({btnsEnabled: false}, async ()=> {
                try {
                    const result = await callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/single/${id}`, this.state.options)
                    let {formConfig, cssConfig, emailConfig, form_name, form_status}  = result;
                    formConfig = JSON.parse(formConfig), cssConfig = JSON.parse(cssConfig), emailConfig = JSON.parse(emailConfig)
                    // console.log({formConfig, cssConfig, emailConfig})
                    this.setState({formConfig, cssConfig, emailConfig, currentForm: {id, form_name, form_status}, adminMode, btnsEnabled: true})
                } catch(err) {
                    this.handleAPIErrors(err)
                }
            })
        } else {
            this.setState({adminMode, currentForm: {id: -1, form_name: '', form_status: ''}, formConfig: {}, cssConfig: {}, emailConfig:{}})
        }
    }

    handleViewMode(viewMode){
        // console.log({viewMode})
        this.setState({viewMode})
    }

    handleStyleMode(styleMode){
        // console.log({styleMode})
        this.setState({styleMode})
    }

    /**
     * Function to enable or disable buttons
     * @param {Boolean} enableVal 
     */
    toggleBtnEnable(enableVal) {
        // console.log({enableVal, priorState: this.state.btnsEnabled})
        this.setState((state, props) => { 
            return {
                btnsEnabled: state.btnsEnabled !== enableVal ? enableVal : state.btnsEnabled 
            }
        });
    }

    async getExistingFormInfo() {
        this.setState({btnsEnabled: false}, callback)
        
        async function callback () {
            try {
                const [k, list] = await Promise.all([callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/api`, this.state.options), callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/list/all`, this.state.options)])
                this.setState({k: k.key, formList: list, btnsEnabled: true})
            } catch (err) {
                this.handleAPIErrors(err)
                this.setState({btnsEnabled: true})
            }
        }
    }

    /**
     * In response to btn click, accepts form_name and user.id to insert a new form record in WPDB
     * @param {String} form_name - unique string
     * @param {Number} created_by - user.id
     * @returns either integer ID of new form or Boolean False
     */
    async createForm(form_name, created_by){
        try {
            const options = {...this.state.options}
            options.method = "POST";
            options.body = JSON.stringify({form_name, created_by});
            const {completed, id} = await callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/single/create`, options);
            if (completed) {
                this.setState({currentFormId: id})
            }
            return id;
        } catch(err) {
            this.handleAPIErrors(err)
            return false;
        }
    }
    /**
     * Stores form config into DB and returns true oif complete
     * @param {Number} id - DB id of form
     * @param {String} type - form_setup, css_setup, or email_setup
     * @param {Object} data - entire config object to be updated
     * @param {String} form_status - status of current form
     * @returns {Boolean} true on success
     */
    async storeConfig(id, type, data) {
        // console.log({type})
        try {
            const options = {...this.state.options}
            options.method = "PUT";
            options.body = JSON.stringify({[type]: data});
            const completed = await callApi(`${this.state.base}/wp-json/cbngiving/v1/admin/forms/single/${id}?type=${type}`, options);
            if (completed && type !== "form_status") {
                const config = type === "css_setup" ? "cssConfig" : type === "form_setup" ? "formConfig" : "emailConfig";
                if (type !== "css_setup") {
                    this.setState({[config]: data})
                    return true;
                } 
                return true;
            }
        } catch(err) {
            this.handleAPIErrors(err)
            return false;
        }
    }

    async setApiKey(key, method) {
        try {
            const options = {...this.state}
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

    /**
     * 
     * @param {Object} fields 
     * @param {Object} errors 
     * @param {boolean} updated 
     */
    handleStyleInputChange(fields, errors, updated) {
        const styleSettings = {...this.state.styleSettings}
        styleSettings.fields = fields;
        styleSettings.errors = errors;
        styleSettings.updated = updated;
        this.setState({ styleSettings }, ()=> this.toggleBtnEnable( updated ? false : true ));
    }

    /**
     * 
     * @param {Object} ctx 
     * @param {Object} initialState 
     * @param {Object} fields 
     * @param {Object} errors 
     */
    handleStyleButtonClick(ctx, fields, errors, initialState, form_status) {
        const styleSettings = {...this.state.styleSettings}
        if (ctx.name === "externalFonts") {
            // console.log({ctx})
            if (ctx.type === "Remove") {
                delete fields[ctx.val]
                delete errors[ctx.val]
            } else {
                const {count} = getFontInfo(true, "externalFont", fields)
                //add empty field to setting
                fields[`externalFont${count}`] = ''
                errors[`externalFont${count}`] = ''
            }
            //update styleSettings
            styleSettings.fields = fields;
            styleSettings.errors = errors;
            styleSettings.updated = JSON.stringify(fields) !== JSON.stringify(initialState);
            // console.log({styleSettings})
            this.setState({styleSettings})
        } else {
            styleSettings.submitting = true;
            styleSettings.fields = fields;
            styleSettings.errors = errors;
            this.setState({styleSettings}, ()=>{
                this.toggleBtnEnable( false )
                const currentState = JSON.stringify(fields);
                const defaultValues = JSON.stringify(initialState);
                if (currentState !== defaultValues) {
                    const cssConfig = {...this.state.cssConfig, ...fields};
                    this.storeConfig(this.state.currentForm.id, ctx.type, cssConfig, form_status)
                    .then(success=>{
                        console.log({success})
                        if (success) {
                            //update settings
                            styleSettings.submitting = false;
                            styleSettings.updated = false;
                            styleSettings.saved = true;
                            styleSettings.errors = {};
                            styleSettings.fields = {};
                            this.setState({styleSettings, cssConfig}, () => {
                                this.toggleBtnEnable( true )
                            })
                        } else {
                            errors['formError'] = "Unable to Save"
                            styleSettings.submitting = false;
                            styleSettings.saved = false;
                            styleSettings.errors = errors;
                            this.setState({styleSettings})
                        }
                    });
                } else {
                    styleSettings.submitting = false;
                    this.setState({styleSettings}, () => {
                        this.toggleBtnEnable( true )
                    })
                }
            });
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
                                createForm={this.createForm}
                                toggleBtnEnable={this.toggleBtnEnable}
                                user={state.user}
                            />
                            <FormOptionsTabs 
                                options={state.options}
                                adminMode={state.adminMode} 
                                viewMode={state.viewMode} 
                                formConfig={state.formConfig}
                                emailConfig={state.emailConfig}
                                currentForm={state.currentForm}
                                enabled={btnsEnabled} 
                                setViewMode={this.handleViewMode}
                                storeConfig={this.storeConfig}
                                toggleBtnEnable={this.toggleBtnEnable}
                            />
                            <StyleOptionsTabs
                                options={state.options}
                                adminMode={state.adminMode} 
                                viewMode={state.viewMode} 
                                styleMode={state.styleMode}
                                cssConfig={state.cssConfig}
                                currentForm={state.currentForm}
                                enabled={btnsEnabled} 
                                setStyleMode={this.handleStyleMode} 
                                storeConfig={this.storeConfig}
                                toggleBtnEnable={this.toggleBtnEnable}
                                handleStyleInputChange={this.handleStyleInputChange}
                                handleStyleButtonClick={this.handleStyleButtonClick}
                                styleSettings={state.styleSettings}
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