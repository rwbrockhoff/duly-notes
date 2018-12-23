import React, { Component } from 'react'
import './Contact.css';
import {connect} from 'react-redux';
import axios from 'axios';

class Contact extends Component {
  constructor(){
    super()
    
    this.state = {
      name: '',
      email: '',
      message: 'Message'
    }
  }

  componentDidMount(){
    this.setState({
      name: this.props.name,
      email: this.props.email
    })
  }

  sendEmail =() => {
    const {name, email, message} = this.state
    axios.post('/api/sendemail', {name: name, email: email, message: message}).then( (res) => {
     window.alert('We have lift off 🚀. Message sent.')
     this.setState({name: '', email: '', message: 'Message' })
    })
  }

  render() {

    return (
      <div className="contact-container">

      <div className="textinfo">
      <h1>Questions? Comments? ...Opinion on the 5th season of Friends?</h1>
      <div className="flex">
      <h2>Fill out this form. We'll read it over <span role="img" > ☕ </span> in the next 1-2 business days.</h2>
      
      </div>


      </div>

     <div className="form">
    
        <input value={ this.state.name|| "Name"} onChange={e => this.setState({name: e.target.value})}/>
      
        <input type={"email"} value={this.state.email || "name@company.com"}
        onChange={e => this.setState({email: e.target.value})}/>
      
        <textarea value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>

        <button onClick={this.sendEmail}>submit</button>

     </div>


      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}

export default connect(mapStateToProps)(Contact)


