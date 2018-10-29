import React from 'react'

import TabHead from './TabHead'
import TabBody from './TabBody'

import tabs from './styles/tabs.css'

    // Colors
    // Fonts
    // Spacing
    // Borders

export default function StyleOptionsTabs(props) {
    const {adminMode, viewMode, styleMode, setStyleMode, cssConfig, storeConfig, currentFormId, enabled, toggleBtnEnable} = props
    const subHeads = ["Colors", "Fonts", "Spacing"]
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
        <React.Fragment>
            { 
                adminMode !== "List" && viewMode === "Style" ? (
                    <React.Fragment>
                        <div styleName="tabs.tab-headers__submenu--tertiary">
                            {tabs}
                        </div>
                        <TabBody currentFormId={currentFormId} adminMode={adminMode} displayMode={styleMode} tabFunctions={{storeConfig, toggleBtnEnable}} tabData={{cssConfig}}/>
                    </React.Fragment>
                ) : (
                    null
                )
            }
        </React.Fragment>
    )
}