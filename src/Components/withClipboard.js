import React, {Component} from 'react'

const withClipboard = ClipboardComponent => class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copied: false
        }
        this.handleCopy = this.handleCopy.bind(this)
    }
    handleCopy(){
        this.setState({copied: true}, ()=>{
            setTimeout(()=> this.setState({copied: false}), 3000);
        });
    }
    render() {
        return <ClipboardComponent {...this.props} copied={this.state.copied} handleCopy={this.handleCopy}/>
    }
}
export default withClipboard