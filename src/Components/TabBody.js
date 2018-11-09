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
    const defaultValues = getDefaultValues(editMode, props.displayMode, props.tabData.cssConfig)
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
                return <FormSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} config={props.tabData.formConfig}/>;
                break;
            case "Name/Address":
                return <NameSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} config={props.tabData.formConfig}/>;
                break;
            case "Gifts":
                return <GivingSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} config={props.tabData.formConfig}/>;
                break;
            case "Products":
                return <ProductSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} config={props.tabData.formConfig}/>;
                break;
            case "Funds":
                return <FundSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} config={props.tabData.formConfig}/>;
                break;
            case "Subscriptions":
                return <SubscriptionSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} config={props.tabData.formConfig}/>;
                break;
            case "Emails":
                return <EmailSettings currentForm={props.currentForm} editMode={editMode} tabFunctions={props.tabFunctions} config={props.tabData.emailConfig}/>;
                break;
            case "Colors":
            case "Fonts":
            case "Spacing":
                return <StyleSettings 
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