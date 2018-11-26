import React from 'react'

import TabHead from './TabHead'
import TabBody from './TabBody'
import FormPreview from './FormPreview'

import tabs from './styles/tabs.css'

export default function FormOptionsTabs(props) {
    const {adminMode, viewMode, setViewMode, formConfig, storeConfig, emailConfig, currentForm, enabled, toggleBtnEnable, options} = props
    const subHeads = ["Settings", "Name/Address", "Gifts", "Products", "Funds", "Subscriptions", "Emails", "Style"]
    if (currentForm.form_status !== "new" && viewMode !== "Style") {
        subHeads.push("Preview")
    }
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
                adminMode !== "List"  && adminMode !== "Add" ? (
                    <React.Fragment>
                        <div styleName="tabs.tab-headers__submenu">
                            {tabs}
                        </div>
                        { 
                            viewMode !== "Style" && viewMode !== "Preview" ? (
                                <TabBody currentForm={currentForm} adminMode={adminMode} displayMode={viewMode} tabFunctions={{storeConfig, toggleBtnEnable}} tabData={{formConfig, emailConfig}}/>
                            ) : null
                        }
                        {
                            viewMode === "Preview" && currentForm.form_status !== "new" ? (
                                <FormPreview currentForm={currentForm} options={options}/>
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