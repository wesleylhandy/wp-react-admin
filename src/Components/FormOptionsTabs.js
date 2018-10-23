import React from 'react'

import TabHead from './TabHead'
import TabBody from './TabBody'

import styles from './styles/index.css'

export default function FormOptionsTabs(props) {
    const {adminMode, viewMode, setViewMode, cssConfig, formConfig, storeConfig, emailConfig} = props
    const subHeads = ["Settings", "Name/Address", "Donations", "Products", "Funds", "Subscriptions", "Emails", "Style"]
    const tabs = subHeads.map((th, ind)=>{
        return (
            <TabHead
                content={th}
                handleClick={setViewMode}
                viewMode={viewMode}
                key={`sh-${ind}`}
            />
        )
    })

    return (
        <React.Fragment>
            { 
                adminMode !== "List" ? (
                    <React.Fragment>
                        <div styleName="tab-headers__submenu">
                            {tabs}
                        </div>
                        <TabBody displayMode={viewMode} tabFunctions={{storeConfig}} tabData={{cssConfig, formConfig, emailConfig}}/>
                    </React.Fragment>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}