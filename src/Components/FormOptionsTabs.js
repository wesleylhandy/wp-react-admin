import React, { Component } from 'react'

export default class FormOptionsTabs extends Component {

    constructor(props) {
        super(props)
        const {configured, permissible, ...clone} = props
        this.state = {
            ...clone
        }
    }



    render() {

    }

}

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
// Email
    // Monthly
    // Single
    // Products
// Style Options Tabs
    // Colors
    // Fonts
    // Spacing
    // Borders