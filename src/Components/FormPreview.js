import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

class FormPreview extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: ''
        }
    }

    async componentDidMount() {
        const options = {...this.props.options}, {currentForm} = this.props
        options.method = 'POST'
        options.body = JSON.stringify({
            title: "Preview Page",
            content: `[cbngivingform form_name='${currentForm.form_name}']`,
            type: 'page'
        })
        try {
            const {id} = await callApi('/wp-json/wp/v2/pages', options)
            // console.log({id})
            this.setState({id})
        } catch (err) {
            console.error(err)
        }
    }

    async componentWillUnmount(){
        const options = {...this.props.options}
        options.method = 'DELETE'
        const {id} = this.state
        try {
            const success = await callApi(`/wp-json/wp/v2/pages/${id}?force=true`, options)
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const {id} = this.state
        return (
            <iframe src={`/?page_id=${id}&preview=true`} style={{width: "100%", height: "100vh"}}></iframe>
        )
    }
}

export default FormPreview;