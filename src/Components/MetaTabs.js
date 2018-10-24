import React from 'react'

// META TABS
import TabHead from './TabHead'
import TabBody from './TabBody'

import tabs from './styles/tabs.css'

export default function MetaTabs(props) {
    // console.log({props})
    const {k, formList, getExistingFormInfo, adminMode, setAdminMode,setApiKey} = props;
    const tabHeads = ["List Forms", "Add New Form"]
    const tabs = tabHeads.map((th, ind)=>{
        return (
            <TabHead
                content={th}
                handleClick={setAdminMode}
                mode={adminMode}
                key={`th-${ind}`}
            />
        )
    })

    return (
        <React.Fragment>
            <div styleName="tabs.tab-headers">
                {tabs}
            </div>
            <TabBody displayMode={adminMode} tabFunctions={{getExistingFormInfo, setAdminMode, setApiKey}} tabData={{k, formList}}/>
        </React.Fragment>
    )

}