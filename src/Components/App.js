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
            user: {}
        }
        this.handleAdminMode = this.handleAdminMode.bind(this);
        this.handleViewMode = this.handleViewMode.bind(this);
    }

    componentDidMount(){
        callApi(`/wp-json/wp/v2/users/me?_nonce=${this.state.nonce}&context=edit`)
        .then(profile=>{
            const primaryRole = profile.roles && profile.roles.length ? profile.roles[0] : '';
            const isAdmin = primaryRole.toLowerCase() === "administrator"
            const user = {id: profile.id, username: profile.username, email: profile.email}
            console.log({primaryRole, isAdmin, user})
            this.setState({configured: true, permissible: isAdmin, user})
        })
        .catch(err=>{
            console.error({err});
            // no way to validate user
            alert('Error validating user, please contact plugin creator.')
        })
    }

    handleAdminMode(e, adminMode, id=""){
        e.preventDefault();
        if (adminMode === "Edit") {
            callApi(`/wp-json/cbngiving/v1/admin/forms/single/${id}?_nonce=${this.state.nonce}`)
            .then(config=>{
                const {formConfig, cssConfig} = config
                this.setState({formConfig, cssConfig})
            })
            .catch(err=>{
                console.error({err});
                alert('There was an error retrieving your forms.\nPlease verify that you are still connected to your wordpress installation and logged in.\nIf so, please contact Wesley.Handy@cbn.org with your issues');
            })
        }
        this.setState({adminMode, formList})
    }

    handleViewMode(e, viewMode){
        e.preventDefault();
        this.setState({viewMode})
    }

    render() {
        const {permissible, configured} = this.state
        return ( 
            <div styleName='page-wrapper' id="react-page-top"> 
                {
                    configured && permissible ? (
                        <React.Fragment>
                            <MetaTabs adminMode={this.state.adminMode} setAdminMode={this.handleAdminMode} wpnonce={this.state.wpnonce} user={this.state.user}/>
                            <FormOptionsTabs {...this.state} setViewMode={this.handleViewMode}/>
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