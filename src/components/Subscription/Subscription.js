import React, { Component } from 'react'
import "./Subscription.css";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

var displayStatus;
var cancelDisplay;

export default class Subscription extends Component {
constructor(){
    super()
    this.state = {
        name: '',
        startDate: '',
        status: '', 
        paymentInfo: '',
        brand: '',
        last4: '', 
        canceled_at: '',
        cancelToggle: false,
        periodEnd: ''

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
        const {stripecust} = res.data;
        var start = res.data.stripecust.created
        var startDate = new Date(start*1000).toDateString();
        //////-------update when user started--------///////

        const {cancel_at_period_end, canceled_at} = stripecust.subscriptions.data[0]

        if (cancel_at_period_end === false){

        const {status, current_period_end} = res.data.stripecust.subscriptions.data[0]
        const {stripecust} = res.data
        var paymentInfo = 'Next Payment: ' + new Date(current_period_end*1000).toDateString();
        var memoriesTogether = "We've been together since " + startDate + "." + " That's true love, baby."
        var welcomeName = "Welcome back, " + res.data.name.given_name
        
        this.setState({startDate: memoriesTogether, status: status, paymentInfo: paymentInfo, name: welcomeName})

        }

        else {
            
        var cancelDate = 'Access until: ' + new Date(canceled_at*1000).toDateString();
        var onlyUntil = "Ever has it been that love knows not its own depth until the hour of separation. -Kahlil Gibran"
        var missYouName = "I'll miss you, " + res.data.name.given_name
        this.setState({startDate: onlyUntil, paymentInfo: cancelDate, status: 'canceled', cancelToggle: true, name: missYouName})
        }
            
            
        ///////------update display w/ card on file------////////
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

handleCancel = () => {
    axios.put('/api/cancelsub').then(res => {
        const {canceled_at, cancel_at_period_end} = res.data;
        var cancelDate = 'Access until: ' + new Date(canceled_at*1000).toDateString();

        this.setState({paymentInfo: cancelDate, status: 'canceled', cancelToggle: true})
        console.log('state', this.state)
    })
}


  render() {
    const {REACT_APP_STRIPE_PUB_KEY} = process.env;

    if (this.state.status === 'active'){
        displayStatus = 'Account Status: Active 🎉 '
    }
    else if (this.state.status === 'canceled'){
        displayStatus = 'Account Status: Canceled 🚧'
        cancelDisplay = {display: 'none'}
    }
    else {
        displayStatus = 'Account Status: Not Active 📡'
    }

    return (
      <div className='subcontainer'>

            <div className='welcomebar'>
                <h1> {this.state.name}. </h1>
                <h3> {this.state.startDate} </h3>
                {/* <h3> We've been together since <b>{this.state.startDate}</b>. Can you believe it? That's true love, baby. </h3> */}
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

                        <h2> {displayStatus} </h2>
                        <h2> {this.state.paymentInfo} </h2>
                        <button className='cancel' style={cancelDisplay} onClick={this.handleCancel}> cancel </button>
                     </div>
            </div>
      </div>
    )
  }
}
