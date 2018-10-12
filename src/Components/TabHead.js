import React from 'react'

import styles from './styles/index.css'

export default function TabHead(props) {
    const isActive = props.content.split(" ")[0] === props.adminMode;
    return (
        <div 
            styleName={`tab-headers__header${isActive ? " tab-headers__headers--active": ""}`} 
            onClick={(e)=>props.handleAdminMode(e, props.adminMode)}
        >
            {props.content}
        </div>
    )
}