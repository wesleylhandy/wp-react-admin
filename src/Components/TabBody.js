import React from 'react'

import ListForms from './ListForms'
import Settings from './Settings'
import NameSettings from './NameSettings'
import GivingSettings from './GivingSettings'
import tabs from './styles/tabs.css'
import ProductSettings from './ProductSettings';
import FundSettings from './FundSettings';
import SubscriptionSettings from './SubscriptionSettings';
import EmailSettings from './EmailSettings';
import StyleSettings from './StyleSettings';


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
    function renderBody(props) {
        const editMode = props.adminMode == "Edit";
        let fields, errors, headline;
        switch (props.displayMode) {
            case "List":
                const {k, formList} = props.tabData;
                return <ListForms tabFunctions={props.tabFunctions} k={k} formList={formList}/>
                break;
            case "Settings":
                return <Settings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Name/Address":
                return <NameSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Gifts":
                return <GivingSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Products":
                return <ProductSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Funds":
                return <FundSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Subscriptions":
                return <SubscriptionSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
                break;
            case "Emails":
                return <EmailSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.emailConfig}/>;
                break;
            case "Colors":
                fields = {
                    "--primary-color": editMode ? props.tabData.cssConfig["--primary-color"] : "#1775BC",
                    "--base-font-color": editMode ? props.tabData.cssConfig["--base-font-color"]: "#333",
                    "--base-bg-color": editMode ? props.tabData.cssConfig["--base-bg-color"] : "#333",
                    "--form-bg-color": editMode ? props.tabData.cssConfig["--form-bg-color"] : '#fff',
                    "--form-text-color": editMode ? props.tabData.cssConfig["--form-text-color"]: '#091d44',
                    "--heading-color": editMode ? props.tabData.cssConfig["--heading-color"]: "#313131",
                    "--input-bg-color": editMode ? props.tabData.cssConfig["--input-bg-color"]: '#fff',
                    "--input-text-color": editMode ? props.tabData.cssConfig["--input-text-color"]: '#091d44',
                    "--placeholder-color": editMode ? props.tabData.cssConfig["--placeholder-color"]: '#7F8C9A',
                    "--hover-bg-color": editMode ? props.tabData.cssConfig["--hover-bg-color"]: '#fff',
                    "--focus-box-shadow": editMode ? props.tabData.cssConfig["--focus-box-shadow"]: "rgba(235, 77, 151, .6)",
                    "--link-color": editMode ? props.tabData.cssConfig["--link-color"]: "#1775BC",
                    "--link-hover-color": editMode ? props.tabData.cssConfig["--link-hover-color"]: "#66afe9",
                    "--label-color": editMode ? props.tabData.cssConfig["--label-color"]: "#105fa5",
                    "--error-color": editMode ? props.tabData.cssConfig["--error-color"]: "crimson"
                },
                errors = {
                    "--primary-color": "",
                    "--base-font-color": "",
                    "--base-bg-color": "",
                    "--form-bg-color": "",
                    "--form-text-color": "",
                    "--heading-color": "",
                    "--input-bg-color": "",
                    "--input-text-color": "",
                    "--placeholder-color": "",
                    "--hover-bg-color": "",
                    "--focus-box-shadow": "",
                    "--link-color": "",
                    "--link-hover-color": "",
                    "--label-color": "",
                    "--error-color": ""
                },
                headline = "Configure Color Setttings";
                return <StyleSettings currentFormId={props.currentFormId} headline={headline} tabFunctions={props.tabFunctions} fields={fields} errors={errors} editMode={editMode}/>;
                break;
            case "Fonts":
                fields = {
                    "externalFont1": editMode ? props.tabData.cssConfig["externalFont1"]: "https://use.typekit.net/zon7onf.css",
                    "--base-font-family": editMode ? props.tabData.cssConfig["--base-font-family"] : "proxima-nova, Arial, sans-serif",
                    "--base-font-style": editMode ? props.tabData.cssConfig["--base-font-style"]: "normal",
                    "--base-font-weight": editMode ? props.tabData.cssConfig["--base-font-weight"] : "400",
                    "--base-font-size": editMode ? props.tabData.cssConfig["--base-font-size"] : '20px',
                    "--italic-font-family": editMode ? props.tabData.cssConfig["--italic-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--italic-font-style": editMode ? props.tabData.cssConfig["--italic-font-style"]: "italic",
                    "--italic-font-weight": editMode ? props.tabData.cssConfig["--italic-font-weight"]: "400",
                    "--semibold-font-family": editMode ? props.tabData.cssConfig["--semibold-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--semibold-font-style": editMode ? props.tabData.cssConfig["--semibold-font-style"]: "normal",
                    "--semibold-font-weight": editMode ? props.tabData.cssConfig["--semibold-font-weight"]: "600",
                    "--semibold-italic-font-family": editMode ? props.tabData.cssConfig["--semibold-italic-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--semibold-italic-font-style": editMode ? props.tabData.cssConfig["--semibold-italic-font-style"]: "italic",
                    "--semibold-italic-font-weight": editMode ? props.tabData.cssConfig["--semibold-italic-font-weight"]: "600",
                    "--bold-font-family": editMode ? props.tabData.cssConfig["--bold-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--bold-font-style": editMode ? props.tabData.cssConfig["--bold-font-style"]: "normal",
                    "--bold-font-weight": editMode ? props.tabData.cssConfig["--bold-font-weight"]: "700",
                    "--bold-italic-font-family": editMode ? props.tabData.cssConfig["--bold-italic-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--bold-italic-font-style": editMode ? props.tabData.cssConfig["--bold-italic-font-style"]: "italic",
                    "--bold-italic-font-weight": editMode ? props.tabData.cssConfig["--bold-italic-font-weight"]: "700"
                },
                errors = {
                    "--base-font-family": "",
                    "--base-font-style": "",
                    "--base-font-weight": "",
                    "--base-font-size": "",
                    "--italic-font-family": "",
                    "--italic-font-style": "",
                    "--italic-font-weight": "",
                    "--semibold-font-family": "",
                    "--semibold-font-style": "",
                    "--semibold-font-weight": "",
                    "--semibold-italic-font-family": "",
                    "--semibold-italic-font-style": "",
                    "--semibold-italic-font-weight": "",
                    "--bold-italic-font-family": "",
                    "--bold-italic-font-style": "",
                    "--bold-italic-font-weight": "",
                    "--bold-font-family": "",
                    "--bold-font-style": "",
                    "--bold-font-weight": "",
                },
                headline = "Configure Font Setttings";
                return <StyleSettings currentFormId={props.currentFormId} headline={headline} tabFunctions={props.tabFunctions} fields={fields} errors={errors} editMode={editMode}/>;
                break;
            case "Buttons":
                fields = {
                    "--btn-font-family": editMode ? props.tabData.cssConfig["--btn-font-family"] : "proxima-nova, Arial, sans-serif",
                    "--btn-font-style": editMode ? props.tabData.cssConfig["--btn-font-style"]: "normal",
                    "--btn-font-weight": editMode ? props.tabData.cssConfig["--btn-font-weight"] : "600",
                    "--btn-text-color": editMode ? props.tabData.cssConfig["--btn-text-color"] : '#fff',
                    "--input-font-family": editMode ? props.tabData.cssConfig["--input-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--input-font-style": editMode ? props.tabData.cssConfig["--input-font-style"]: "normal",
                    "--input-font-weight": editMode ? props.tabData.cssConfig["--input-font-weight"]: '400',
                    "--label-font-family": editMode ? props.tabData.cssConfig["--label-font-family"]: 'proxima-nova, Arial, sans-serif',
                    "--label-font-style": editMode ? props.tabData.cssConfig["--label-font-style"]: 'normal',
                    "--label-font-weight": editMode ? props.tabData.cssConfig["--label-font-weight"]: "600",
                    "--error-font-family": editMode ? props.tabData.cssConfig["--error-font-family"]: "proxima-nova, Arial, sans-serif",
                    "--error-font-style": editMode ? props.tabData.cssConfig["--error-font-style"]: "normal",
                    "--error-font-weight": editMode ? props.tabData.cssConfig["--error-font-weight"]: "700"
                },
                errors = {
                    "--btn-font-family": "",
                    "--btn-font-style": "",
                    "--btn-font-weight": "",
                    "--btn-text-color": "",
                    "--input-font-family": "",
                    "--input-font-style": "",
                    "--input-font-weight": "",
                    "--label-font-family": "",
                    "--label-font-style": "",
                    "--label-font-weight": "",
                    "--error-font-family": "",
                    "--error-font-style": "",
                    "--error-font-weight": ""
                },
                headline = "Configure Button Setttings";
                return <StyleSettings currentFormId={props.currentFormId} headline={headline} tabFunctions={props.tabFunctions} fields={fields} errors={errors} editMode={editMode}/>;
                break;
            case "Borders":
                return <StyleSettings currentFormId={props.currentFormId} headline={headline} tabFunctions={props.tabFunctions} fields={fields} errors={errors} editMode={editMode}/>;
                break;
            default:
                return null;
        }  
    }
    return (
        <div styleName="tabs.tab-body">
            {renderBody(props)}
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