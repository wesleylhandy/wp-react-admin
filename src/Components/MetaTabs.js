import React from 'react'

// META TABS
import TabHead from './TabHead'
import TabBody from './TabBody'

import tabs from './styles/tabs.css'

export default function MetaTabs(props) {
    // console.log({enabled: props.enabled})
    const {k, formList, getExistingFormInfo, adminMode, setAdminMode, createForm, deleteForm, setApiKey, enabled, toggleBtnEnable, user} = props;
    const tabHeads = ["List Forms", "Add New Form"]
    const tabs = tabHeads.map((th, ind)=>{
        return (
            <TabHead
                enabled={enabled}
                content={th}
                handleClick={setAdminMode}
                mode={adminMode}
                key={`th-${ind}`}
                toggleBtnEnable={toggleBtnEnable}
            />
        )
    })
    // console.log({props, user})
    return (
        <React.Fragment>
            <div styleName="tabs.tab-headers">
                {tabs}
            </div>
            <TabBody displayMode={adminMode} tabFunctions={{getExistingFormInfo, setAdminMode, setApiKey, toggleBtnEnable, createForm, deleteForm}} tabData={{k, formList, user}}/>
        </React.Fragment>
    )
}