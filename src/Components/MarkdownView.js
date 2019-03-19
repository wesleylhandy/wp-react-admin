import React from 'react'

import styles from './styles/markdown.css'

function createMarkup(content) {
    return {__html: content};
}

function MarkdownView({content}) {
    return <div styleName="styles.markdown-view" dangerouslySetInnerHTML={createMarkup(content)}></div>
}

export default MarkdownView