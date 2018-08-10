import React, { Component } from 'react'
import './Plan.css';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import {withRouter} from 'react-router-dom';

export default class Pricing extends Component {

  componentDidMount(){
    //do we have a new user, or already a created account
    axios.get('/api/verify').then(res => {
          
      if (res.data === 'notactive' || res.data === 'active'){

       this.props.history.push("/subscription");
      }
      
      
    })
  }

  onToken = (token) => {
    console.log('token', token)
    axios.post('/api/payment', {token, amount: 100} ).then( res => {
    // axios.post('/api/linkcustomer', {card: token.id})
    })
  }

  render() {
    const {REACT_APP_STRIPE_PUB_KEY} = process.env;
    
    return (
      <div className='Container'>

       <div className='Info'>
        <h1>Life is about to get a lot more zen.</h1>
        </div>

        <div className='Plan'>
              <div className='PlanItem'>
        <h1> $5/month </h1>
        <h4> Pay month to month. Cancel at anytime. </h4>
       
        <StripeCheckout
        name="Note Co."
        description="www.note.com"
        panelLabel="Subscribe"
        // image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
        stripeKey={REACT_APP_STRIPE_PUB_KEY}
        token={this.onToken}/>
            </div>
        </div>
      
      </div>
    )
  }
}
