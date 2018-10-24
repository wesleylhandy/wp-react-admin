import React from 'react'

import tabs from './styles/tabs.css'

export default function TabHead(props) {
    const content = props.content.split(" ")[0]
    const isActive = content.includes(props.mode);
    // console.log({isActive, content, mode: props.mode})
    return (
        <div 
            styleName={`tabs.tab-headers__header${isActive ? " tabs.tab-headers__header--active": ""}`} 
            onClick={e => {
                e.preventDefault();
                props.handleClick(e, content)
            }}
        >
            {props.content}
        </div>
    )
}