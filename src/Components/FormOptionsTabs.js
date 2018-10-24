import React from 'react'

import TabHead from './TabHead'
import TabBody from './TabBody'

import tabs from './styles/tabs.css'

export default function FormOptionsTabs(props) {
    const {adminMode, viewMode, setViewMode, cssConfig, formConfig, storeConfig, emailConfig} = props
    const subHeads = ["Settings", "Name/Address", "Gifts", "Products", "Funds", "Subscriptions", "Emails", "Style"]
    const tabs = subHeads.map((th, ind)=>{
        return (
            <TabHead
                content={th}
                handleClick={setViewMode}
                mode={viewMode}
                key={`sh-${ind}`}
            />
        )
    })

    return (
        <React.Fragment>
            { 
                adminMode !== "List" ? (
                    <React.Fragment>
                        <div styleName="tabs.tab-headers__submenu">
                            {tabs}
                        </div>
                        <TabBody adminMode={adminMode} displayMode={viewMode} tabFunctions={{storeConfig}} tabData={{cssConfig, formConfig, emailConfig}}/>
                    </React.Fragment>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}