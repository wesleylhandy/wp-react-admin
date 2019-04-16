import React from 'react'

import tabs from './styles/tabs.css'

import { getDefaultValues } from './helpers/getDefaultValues'

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
    const editMode = props.adminMode == "Edit"
    let defaultValues = {}
    function renderBody({displayMode, tabData, tabFunctions, currentForm, styleSettings}, editMode, defaultValues) {  
        // console.log({k, formList, user})
        switch (displayMode) {
            case "List":
                const {k, formList} = tabData;
                return <ListForms tabFunctions={tabFunctions} k={k} formList={formList} user={tabData.user}/>
                break;
            case "Add": 
                const {user} = tabData;
                return <AddForm tabFunctions={tabFunctions} user={user}/>
                break;
            case "Settings":
                const config = {...tabData.formConfig, "form_status": currentForm.form_status}
                defaultValues = getDefaultValues(editMode, displayMode, config)
                return <FormSettings currentForm={currentForm} displayMode={displayMode} tabFunctions={tabFunctions} defaultValues={defaultValues} config={tabData.formConfig}/>;
                break;
            case "Name/Address":
                defaultValues = getDefaultValues(editMode, displayMode, tabData.formConfig)
                return <NameSettings currentForm={currentForm} displayMode={displayMode} tabFunctions={tabFunctions} defaultValues={defaultValues} config={tabData.formConfig}/>;
                break;
            case "Gifts":
            // console.log({tabData})
                defaultValues = getDefaultValues(editMode, displayMode, tabData.formConfig)
                return <GivingSettings currentForm={currentForm} displayMode={displayMode} tabFunctions={tabFunctions} defaultValues={defaultValues} config={tabData.formConfig}/>;
                break;
            case "Products":
                defaultValues = getDefaultValues(editMode, displayMode, tabData.formConfig)
                return <ProductSettings currentForm={currentForm} displayMode={displayMode} tabFunctions={tabFunctions} defaultValues={defaultValues} config={tabData.formConfig}/>;
                break;
            case "Designations":
                defaultValues = getDefaultValues(editMode, displayMode, tabData.formConfig)
                return <FundSettings currentForm={currentForm} displayMode={displayMode} tabFunctions={tabFunctions} defaultValues={defaultValues} config={tabData.formConfig}/>;
                break;
            case "Subscriptions":
                defaultValues = getDefaultValues(editMode, displayMode, tabData.formConfig)
                return <SubscriptionSettings currentForm={currentForm} displayMode={displayMode} tabFunctions={tabFunctions} defaultValues={defaultValues} config={tabData.formConfig}/>;
                break;
            case "Emails":
                // console.log({tabData})
                defaultValues = getDefaultValues(editMode, displayMode, tabData.emailConfig)
                // console.log({defaultValues})
                return <EmailSettings currentForm={currentForm} displayMode={displayMode} tabFunctions={tabFunctions} defaultValues={defaultValues} config={tabData.emailConfig}/>;
                break;
            case "Colors":
            case "Fonts":
            case "Spacing":
                defaultValues = getDefaultValues(editMode, displayMode, tabData.cssConfig)
                return <StyleSettings 
                    styleSettings={styleSettings}
                    currentForm={currentForm} 
                    tabFunctions={tabFunctions} 
                    defaultValues={defaultValues} 
                    editMode={editMode} 
                    config={tabData.cssConfig} 
                    displayMode={displayMode}
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