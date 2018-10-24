import React from 'react'

import List from './List'
import Settings from './Settings'
import NameSettings from './NameSettings'
import GivingSettings from './GivingSettings'
import tabs from './styles/tabs.css'


// List of Forms [DEFAULT TAB]
    // Default Admin Mode: View
    //Display List of Forms saved in DB
    // Page, URL, Status
    //Button to Add New - Link to ADD Form Tab
    //Button to Edit
    //Button to Delete ????
// Add New Form Tab [MetaTab?]
    // Set Admin Mode to Add
// Edit Existing Form [MetaTab]
    // Set Admin Mode to Edit


export default function TabBody(props) {
    function renderBody() {
        switch (props.displayMode) {
            case "List":
                const {k, formList} = props.tabData;
                return <List tabFunctions={props.tabFunctions} k={k} formList={formList}/>
                break;
            case "Settings":
                return <Settings adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Name/Address":
                return <NameSettings adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Gifts":
                return <GivingSettings adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            default:
                return null;
        }  
    }
    return (
        <div styleName="tabs.tab-body">
            {renderBody()}
        </div>
    )
}

// FORM OPTIONS TABS
// Form Settings
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