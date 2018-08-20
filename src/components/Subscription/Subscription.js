import React, { Component } from 'react'
import "./Subscription.css";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Elements} from 'react-stripe-elements';
import InjectedUpdateCard from '../UpdateCard/UpdateCard';
import DeleteMod from '../DeleteMod/DeleteMod';

var displayStatus;
var cancelDisplay;

class Subscription extends Component {
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
        cancelButtonClick: false,
        periodEnd: '',
        updateCard: false

    }
    this.updateCardDisplay = this.updateCardDisplay.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.verifyCancel = this.verifyCancel.bind(this)
}
componentDidMount(){
     //do we have a new user, or already a created account
     axios.get('/api/verify').then(res => {
        
        if (res.data === 'noaccount'){
             this.props.history.push("/");
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
        var welcomeName = "Welcome back, " + res.data.name.given_name + '.'
        
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

updateCardDisplay = (card) => {
        const {brand, last4} = card.token.card
        this.setState({brand: brand, last4: last4, updateCard: false})  
}

verifyCancel = () => {
    this.setState({cancelButtonClick: !this.state.cancelButtonClick})
}


handleCancel = () => {
    
    axios.put('/api/cancelsub').then(res => {
       
        const {canceled_at, cancel_at_period_end} = res.data;
        var cancelDate = 'Access until: ' + new Date(canceled_at*1000).toDateString();

        var missYou = "I'll miss you, " + this.props.given_name
        var onlyQuote = "Ever has it been that love knows not its own depth until the hour of separation. -Kahlil Gibran"
        this.setState({paymentInfo: cancelDate, status: 'canceled', cancelToggle: true, cancelButtonClick: false, name: missYou, startDate: onlyQuote})
    })
}


  render() {
      
    const {REACT_APP_STRIPE_PUB_KEY} = process.env;

    if (this.state.status === 'active'){
        displayStatus = `Account Status: Active 🎉 `
    }
    else if (this.state.status === 'canceled'){
        displayStatus = 'Account Status: Canceled 🚧'
        cancelDisplay = {display: 'none'}
    }
    else {
        displayStatus = 'Account Status: Not Active 📡'
    }

    var renderDelete = () => {
        if(this.state.cancelButtonClick){
          return (
            <DeleteMod {...this.props} cancelSub={this.handleCancel} close={this.verifyCancel}/>
          )
        }
        
      }

    return (
    <div className='subframe'>
        {renderDelete()}
      <div className='subcontainer' style={{filter: this.state.cancelButtonClick ? 'blur(2px)' : 'blur(0px)'}}>
        
            <div className='welcomebar'>
                <h1> {this.state.name} </h1>
                <h3> {this.state.startDate} </h3>
                
            </div>

            <div className='userinfo'>
                <h1> Subscription Info: </h1>

                    <div className='infobox'>

                    <div className ='card'>
                        <h3> {this.state.brand} ending in ****{this.state.last4} </h3>

                        <button className='updatecard' onClick={() => this.setState({updateCard: !this.state.updateCard})}>
                        Update Card
                        </button>
                        <button className='cancel' style={cancelDisplay} onClick={this.verifyCancel}> Cancel Subscription </button>
                        
                    </div>
                     
                    <div className='signup'>
                        <Elements>
                            <InjectedUpdateCard card={this.state.updateCard} 
                            updateCard={this.updateCardDisplay}/>
                        </Elements>
                    </div>
                
                    <div className='status'>
                        <h3> {displayStatus} </h3> &nbsp; &nbsp; &nbsp;
                        <h3> {this.state.paymentInfo} </h3>
                    </div>

                     </div>
            </div>
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
export default connect(mapStateToProps)(Subscription)
