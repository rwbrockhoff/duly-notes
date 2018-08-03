import React, { Component } from 'react'
import './Plan.css';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'


export default class Pricing extends Component {

  componentDidMount(){
    axios.post('/api/createcustomer').then( (res) => {
      console.log(res)
    })
  }

  onToken = (token) => {
    console.log('token', token)
    axios.post('/api/payment', {token, amount: 100} ).then( res => {
    axios.post('/api/linkcustomer', {card: token.id})
    })
  }

  render() {
    const {REACT_APP_STRIPE_PUB_KEY} = process.env;
    
    return (
      <div>
        <div className='Plan'>
        <h1> $5/month. Best notes ever.  </h1>
        <StripeCheckout
        stripeKey={REACT_APP_STRIPE_PUB_KEY}
        token={this.onToken}/>
        </div>
      </div>
    )
  }
}
