import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import './styles/admin-page.css'

import MetaTabs from './Metatabs.js'
import FormOptionsTabs from './FormOptionsTabs'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            adminMode: "List"
        }
        this.handleAdminMode = this.handleAdminMode.bind(this);
    }

    handleAdminMode(e, adminMode) {
        // get name of clicked element
        // set mode
    }

    render() {
        return ( 
            <div styleName='page-wrapper' id="react-page-top"> 
                <MetaTabs adminMode={this.state.adminMode} setAdminMode={this.handleAdminMode}/>
                <FormOptionsTabs adminMode={this.state.adminMode}/>
                {
                    // Display Menu of Options in Tabs
                    
                    // FORM OPTIONS TABS
                        // Form Settings
                            // Get API KEY (if not deprecated)
                            // Get Campaign Name
                            // Toggles for Major Form Options
                        // Giving Arrays - if Monthly or Single Gift Toggled On
                            // Values and Optional Text
                        // Products  - if Products Toggle ON
                            // Drop Down for Number of Products
                            // Input Groups for Each Product
                        // Funds - if Funds Toggle On
                            // Drop Down for Number of Funds
                            // Input Groups for Each Fund
                        // Subscriptions
                            // Subscriptions to Add, Subscriptions to Remove
                        // Style Options Tabs
                            // Colors
                            // Fonts
                            // Spacing
                            // Borders
                }
            </div>
        )
    }
}

export default hot(module)(App)