import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import withClipboard from './withClipboard'

import styles from './styles/clipboard.css'

function Clipboard({text, handleCopy, copied}) {
    return (
        <CopyToClipboard 
            text={text}
            onCopy={
                ()=>{
                    console.log(`Copied ${text} to Clipboard.`)
                    handleCopy()
                }
            }
        >
            <span styleName={`styles.copy-btn ${copied ? "styles.copy-btn--copied" : ""}`}>{copied ? "Copied" : "Copy to Clipboard"}</span>
        </CopyToClipboard>
    )
}

export default withClipboard(Clipboard);