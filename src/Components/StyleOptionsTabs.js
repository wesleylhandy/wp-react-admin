import React, {Fragment} from 'react'

import TabHead from './TabHead'
import TabBody from './TabBody'
import FormPreview from './FormPreview'

import tabs from './styles/tabs.css'

export default function StyleOptionsTabs(props) {
    const { 
        options,
        adminMode, 
        viewMode, 
        styleMode, 
        setStyleMode, 
        cssConfig, 
        storeConfig, 
        currentForm, 
        enabled, 
        toggleBtnEnable, 
        handleStyleButtonClick, 
        handleStyleInputChange, 
        styleSettings
    } = props
    const subHeads = ["Colors", "Fonts", "Spacing"]
    // if (currentForm.form_status !== "new") {
    //     subHeads.push("Preview")
    // }
    const tabs = subHeads.map((th, ind)=>{
        return (
            <TabHead
                enabled={enabled}
                content={th}
                handleClick={setStyleMode}
                mode={styleMode}
                key={`sh-${ind}`}
                toggleBtnEnable={toggleBtnEnable}
            />
        )
    })

    return (
        <Fragment>
            { 
                adminMode !== "List" && adminMode !== "Add" && viewMode === "Style" && (
                    <Fragment>
                        <div styleName="tabs.tab-headers__submenu--tertiary">
                            {tabs}
                        </div>
                        {
                            styleMode !== "Preview" ? (
                                <TabBody 
                                    currentForm={currentForm} 
                                    adminMode={adminMode} 
                                    displayMode={styleMode} 
                                    tabFunctions={{storeConfig, toggleBtnEnable, handleStyleButtonClick, handleStyleInputChange}} 
                                    tabData={{cssConfig}}
                                    styleSettings={styleSettings}
                                />
                            ) : currentForm.form_status !== "new" ? (
                                <FormPreview currentForm={currentForm} options={options}/>
                            ) : null
                        }
                    </Fragment>
                ) 
            }
        </Fragment>
    )
}