import React, { Component } from 'react'
import './Contact.css';

export default class Contact extends Component {
  render() {
    return (
      <div className="contact-container">

      <div className="textinfo">
      <h1>Questions? Comments? ...Opinion on the 5th season of Friends?</h1>
      <div className='response'>
      <h2>Fill out this form. We'll read it over ☕ in the next 1-2 business days.</h2>
      
      </div>


      </div>

     <div className="form">
    
        <input placeholder={"Name"}/>
      
        <input type={"email"} placeholder={"name@company.com"}/>
      
        <textarea placeholder={"Message"}/>

        <button>Submit</button>

     </div>


      </div>
    )
  }
}
