import React from 'react'

import tabs from './styles/tabs.css'

import ListForms from './ListForms'
import AddForm from './AddForm'
import FormSettings from './FormSettings'
import NameSettings from './NameSettings'
import GivingSettings from './GivingSettings'
import ProductSettings from './ProductSettings';
import FundSettings from './FundSettings';
import SubscriptionSettings from './SubscriptionSettings';
import EmailSettings from './EmailSettings';
import ColorSettings from './ColorSettings';
import FontSettings from './FontSettings';
import SpacingSettings from './SpacingSettings';

export default function TabBody(props) {
    function renderBody(props) {
        switch (props.displayMode) {
            case "List":
                const {k, formList} = props.tabData;
                return <ListForms tabFunctions={props.tabFunctions} k={k} formList={formList}/>
                break;
            case "Add": 
                return <AddForm tabFunctions={props.tabFunctions} k={k}/>
                break;
            case "Settings":
                return <FormSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} formConfig={props.tabData.formConfig}/>;
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
                return <EmailSettings currentFormId={props.currentFormId} adminMode={props.adminMode} tabFunctions={props.tabFunctions} emailConfig={props.tabData.emailConfig}/>;
                break;
            case "Colors":
                return <ColorSettings currentFormId={props.currentFormId} tabFunctions={props.tabFunctions} adminMode={props.adminMode} cssConfig={props.tabData.cssConfig}/>;
                break;
            case "Fonts":
                return <FontSettings currentFormId={props.currentFormId} tabFunctions={props.tabFunctions} adminMode={props.adminMode} cssConfig={props.tabData.cssConfig} />;
                break;
     
            case "Spacing":
                return <SpacingSettings currentFormId={props.currentFormId} tabFunctions={props.tabFunctions} adminMode={props.adminMode} cssConfig={props.tabData.cssConfig}/>;
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