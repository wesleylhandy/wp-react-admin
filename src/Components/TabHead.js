import React from 'react'

import tabs from './styles/tabs.css'

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
                    props.handleClick(e, content)
                }
            }}
        >
            {props.content}
        </div>
    )
}