import React, {Component} from 'react'

import { callApi } from './helpers/fetch-helpers'

import styles from './styles/index.css'

import FormButton from './FormButton'
import swal from 'sweetalert'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        console.log({props});
        this.state = {

        }
        this.handleButtonClick=this.handleButtonClick.bind(this)
        this.handleEditApiKey = this.handleEditApiKey.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async componentDidMount() {
        
    }

    handleButtonClick(e, ctx) {
        
    }

    async handleEditApiKey(e) {
        
    }

    handleInputChange(e) {
       
    }
    
    render() {
        
        return (
            <React.Fragment>
                
            </React.Fragment>
        )
    }
}