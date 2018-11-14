import React from 'react'

import tabs from './styles/tabs.css'

import {getDefaultValues} from './helpers/getDefaultValues'

import ListForms from './ListForms'
import AddForm from './AddForm'
import FormSettings from './FormSettings'
import NameSettings from './NameSettings'
import GivingSettings from './GivingSettings'
import ProductSettings from './ProductSettings';
import FundSettings from './FundSettings';
import SubscriptionSettings from './SubscriptionSettings';
import EmailSettings from './EmailSettings';
import StyleSettings from './StyleSettings';

export default function TabBody(props) {
    const editMode = props.adminMode == "Edit" && props.currentForm.form_status && props.currentForm.form_status !== "new"
    let defaultValues = {}
    function renderBody(props, editMode, defaultValues) {  
        // console.log({k, formList, user})
        switch (props.displayMode) {
            case "List":
                const {k, formList} = props.tabData;
                return <ListForms tabFunctions={props.tabFunctions} k={k} formList={formList}/>
                break;
            case "Add": 
                const {user} = props.tabData;
                return <AddForm tabFunctions={props.tabFunctions} user={user}/>
                break;
            case "Settings":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.formConfig)
                return <FormSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} defaultValues={defaultValues} config={props.tabData.formConfig}/>;
                break;
            case "Name/Address":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.formConfig)
                return <NameSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} defaultValues={defaultValues} config={props.tabData.formConfig}/>;
                break;
            case "Gifts":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.formConfig)
                return <GivingSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} defaultValues={defaultValues} config={props.tabData.formConfig}/>;
                break;
            case "Products":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.formConfig)
                return <ProductSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} defaultValues={defaultValues} config={props.tabData.formConfig}/>;
                break;
            case "Funds":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.formConfig)
                return <FundSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} defaultValues={defaultValues} config={props.tabData.formConfig}/>;
                break;
            case "Subscriptions":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.formConfig)
                return <SubscriptionSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} defaultValues={defaultValues} config={props.tabData.formConfig}/>;
                break;
            case "Emails":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.emailConfig)
                return <EmailSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} defaultValues={defaultValues} config={props.tabData.emailConfig}/>;
                break;
            case "Colors":
            case "Fonts":
            case "Spacing":
                defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.cssConfig)
                return <StyleSettings 
                    styleSettings={props.styleSettings}
                    currentForm={props.currentForm} 
                    tabFunctions={props.tabFunctions} 
                    defaultValues={defaultValues} 
                    editMode={editMode} 
                    config={props.tabData.cssConfig} 
                    displayMode={props.displayMode}
                />
                break;
            default:
                return null;
        }  
    }
    return (
        <div styleName="tabs.tab-body">
            {renderBody(props, editMode, defaultValues)}
        </div>
    )
}