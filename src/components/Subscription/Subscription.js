import React, { Component } from 'react'
import "./Subscription.css";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

var displayStatus;

export default class Subscription extends Component {
constructor(){
    super()
    this.state = {
        name: '',
        startDate: '',
        status: '', 
        nextPayment: '',
        brand: '',
        last4: ''
    }
}
componentDidMount(){
     //do we have a new user, or already a created account
     axios.get('/api/verify').then(res => {
        
        if (res.data === 'noaccount'){
             this.props.history.push("/plan");
        } 

    axios.get('/api/customerid').then( res => {
        console.log(res.data.stripecust)
        var start = res.data.stripecust.created
        var startDate = new Date(start*1000).toDateString();
        
        const {status, current_period_end} = res.data.stripecust.subscriptions.data[0]
        const {stripecust} = res.data
        var nextPayment = new Date(current_period_end*1000).toDateString();

        this.setState({startDate: startDate, status: status, nextPayment: nextPayment, name: res.data.name.given_name})
  
            
            

        axios.post('/api/customersub', {customer: stripecust}).then(card => {
            const {brand, last4} = card.data;
            this.setState({brand: brand, last4: Number.parseInt(last4)})
        })
    })
     
      })
}

onToken = (token) => {
    console.log('token', token)
    axios.put('/api/updatecard', {token} ).then( res => {
        const {brand, last4} = token.card
        this.setState({brand: brand, last4: last4})
    })
  }


  render() {
    const {REACT_APP_STRIPE_PUB_KEY} = process.env;

    if (this.state.status === 'active'){
        displayStatus = 'Active 🎉 '
    }
    else {
        displayStatus = 'Not Active 📡'
    }

    return (
      <div className='subcontainer'>

            <div className='welcomebar'>
                <h1> Welcome back, {this.state.name}. </h1>
                <h3> We've been together since <b>{this.state.startDate}</b>. Can you believe it? That's true love, baby. </h3>
            </div>

            <div className='userinfo'>
                <h1> Subscription Info: </h1>

                    <div className='infobox'>

                    <div className ='card'>
                        <h3> {this.state.brand} ending in ****{this.state.last4} </h3>
                        <StripeCheckout
                            name="Note Co."
                            description="www.note.com"
                            panelLabel="Update Payment Method"
                            stripeKey={REACT_APP_STRIPE_PUB_KEY}
                            token={this.onToken}
                            />
                       
                       
                    </div>

                        <h2> Account Status: {displayStatus} </h2>
                        <h2> Next Payment: {this.state.nextPayment} </h2>
                        <button> Cancel </button>
                     </div>
            </div>
      </div>
    )
  }
}
