import React, { Component } from 'react'
import './UpdateCard.css';
import {injectStripe} from 'react-stripe-elements';
import CardSection from '../CardSection/CardSection';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion';


class UpdateCard extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            success: false
        }
    }
    handleSubmit = (ev) => {
        
        ev.preventDefault();
    
        this.props.stripe.createToken({name: this.props.name, email: this.props.email}).then(({token}) => {
    
            axios.put('/api/updatecard', {token} ).then( res => {
                this.props.updateCard({token})
                })
            })
      };

  render() {
        return (
     
        <div className='updatecardcontainer' style={{display: this.props.card ? '' : 'none'}}>
            <form className='updatecardform' onSubmit={this.handleSubmit}>
            <center><h2> Let's update those digits.</h2></center>
            <CardSection />
            <center><button onClick={(ev) => this.updateCard}>Update Card</button></center>
            </form>
       </div>
    )
  }
}

function mapStateToProps(state){
    return {
        ...this.props, ...state
    }
}

export default connect(mapStateToProps)(injectStripe(UpdateCard));