import React from 'react'
import swal from '@sweetalert/with-react'

import MarkdownView from './MarkdownView';

function PreviewButton({field, title, className}){
    return (
        <div onClick={
            (e) => {
                swal({
                    button: "Close",
                    content: (
                        <MarkdownView content={field} />
                    ),
                    title,
                    className
                })
            }
        } style={
            {
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: "60px",
                width: "60px",
                background: "#0085ba",
                border: "1px solid #fff",
                boxShadow: "inset 0 0 5px #fff",
                color: "#fff",
                borderRadius: "50%",
                textAlign: "center",
                cursor:"pointer",
                margin: "5px"
            }
        }
        >Preview</div>
    )
}

export default PreviewButton