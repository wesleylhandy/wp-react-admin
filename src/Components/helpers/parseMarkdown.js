import marked from 'marked'
import hljs from 'highlight.js'

export function parseMarkdown(content) {
    return marked(content, {
        highlight: code => hljs.highlightAuto(code).value,
        gfm: true, 
        tables: true
    });
}