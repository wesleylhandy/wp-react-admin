import React from 'react'

// META TABS
import TabHead from './TabHead'
import TabBody from './TabBody'

import styles from './styles/index.css'

export default  function MetaTabs(props) {
    const tabHeads = ["List Forms", "Add New Form", "Edit Existing Form"]
    const tabs = tabHeads.map((th, ind)=>{
        return (
            <TabHead
                content={th}
                onClick={props.handleAdminMode}
                adminMode={props.adminMode}
                key={`th-${ind}`}
            />
        )
    })
    return (
        <React.Fragment>
            <div styleName="tab-headers">
                {tabs}
            </div>
            <TabBody menuDisplay={props.adminMode}/>
        </React.Fragment>
    )

}