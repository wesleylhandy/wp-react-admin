import React from 'react'

// META TABS
import TabHead from './TabHead'
import TabBody from './TabBody'

import styles from './styles/index.css'

export default function MetaTabs(props) {
    console.log({props})
    const {k, formList, getExistingFormInfo, adminMode, setAdminMode} = props;
    const tabHeads = ["List Forms", "Add New Form"]
    const tabs = tabHeads.map((th, ind)=>{
        return (
            <TabHead
                content={th}
                handleClick={setAdminMode}
                adminMode={adminMode}
                key={`th-${ind}`}
            />
        )
    })

    return (
        <React.Fragment>
            <div styleName="tab-headers">
                {tabs}
            </div>
            <TabBody displayMode={adminMode} tabFunctions={{getExistingFormInfo, setAdminMode}} tabData={{k, formList}}/>
        </React.Fragment>
    )

}