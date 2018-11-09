import React from 'react'

import tabs from './styles/tabs.css'
import swal from 'sweetalert'

export default function TabHead(props) {
    const content = props.content.split(" ")[0]
    const isActive = content.includes(props.mode);
    // console.log({isActive, content, mode: props.mode})
    return (
        <div 
            styleName={`tabs.tab-headers__header${isActive ? " tabs.tab-headers__header--active": ""}${props.enabled ? "": " tabs.tab-headers__header--disabled"}`} 
            onClick={e => {
                e.preventDefault();
                if (props.enabled) {
                    props.handleClick(content)
                } else if (props.mode !== "List") {
                    clickAlert().then(update=>{
                        props.toggleBtnEnable(update)
                        if (update) {
                            props.handleClick(content)
                        }
                    })
                }
            }}
        >
            {props.content}
        </div>
    )
}

async function clickAlert() {
    const willEdit = await swal({
        title: "Are you sure?",
        text: 'Leaving this page without saving may result in lost data or a broken form. Are you ready to leave this page with unsaved changes anyway?',
        icon: "warning",
        buttons: true,
        dangerMode: true
    })

    if (willEdit) {
        return true
    } else {
        return false
    }
}