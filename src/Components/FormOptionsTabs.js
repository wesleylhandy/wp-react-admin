import React from 'react'

import TabHead from './TabHead'
import TabBody from './TabBody'

import tabs from './styles/tabs.css'

export default function FormOptionsTabs(props) {
    const {adminMode, viewMode, setViewMode, formConfig, storeConfig, emailConfig, currentFormId, enabled, toggleBtnEnable} = props
    const subHeads = ["Settings", "Name/Address", "Gifts", "Products", "Funds", "Subscriptions", "Emails", "Style"]
    const tabs = subHeads.map((th, ind)=>{
        return (
            <TabHead
                enabled={enabled}
                content={th}
                handleClick={setViewMode}
                mode={viewMode}
                key={`sh-${ind}`}
                toggleBtnEnable={toggleBtnEnable}
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
                        { 
                            viewMode !== "Style" ? (
                                <TabBody currentFormId={currentFormId} adminMode={adminMode} displayMode={viewMode} tabFunctions={{storeConfig, toggleBtnEnable}} tabData={{formConfig, emailConfig}}/>
                            ) : null
                        }
                    </React.Fragment>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}