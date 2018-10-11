import React from 'react'

// List of Forms [DEFAULT TAB]
    // Default Admin Mode: View
    //Display List of Forms saved in DB
    // Page, URL, Status
    //Button to Add New - Link to ADD Form Tab
    //Button to Edit
    //Button to Delete ????
// Add New Form Tab [MetaTab?]
    // Set Admin Mode to Add
// Edit Existing Form [MetaTab]
    // Set Admin Mode to Edit

import FormList from './FormList'

export default function TabBody(props) {
    return (
        <div styleName="tab-body">
            {
                ()=>{
                    switch (props.displayMode) {
                        case "List":
                            return <FormList/>
                            break;
                        default:
                            return null;
                    }  
                }
            }
        </div>
    )
}