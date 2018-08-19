import React, { Component } from 'react'
import './CheckOutForm.css';
import {injectStripe} from 'react-stripe-elements';
import CardSection from '../CardSection/CardSection';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion';


class CheckOutForm extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            success: false
        }
    }
    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();
    
        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.
        this.props.stripe.createToken({name: this.props.name, email: this.props.email}).then(({token}) => {
          
          axios.post('/api/payment', {token}).then( res => {
              this.setState({success: true})

              setTimeout(() => {
                this.props.history.push("/texteditor");
              }, 2000)
              
          })
        });
      };

  render() {
     
    return (
        <div className='checkoutformcontainer'>
        
        <Motion style={{m: spring(this.state.success ? -40 : 20) }}>

            {({m}) =>     

            <div className='checkoutbox' style={{marginTop: this.state.success ? m + 'vh' : m + 'vh'}}>

        <center><h1>Life is about to get a lot more 🧘</h1></center>
        
        <form className='checkout' onSubmit={this.handleSubmit}>
        <center><h2> $5 a month. Cancel at anytime.</h2></center>
        <CardSection />
        <center><button>Sign Up</button></center>
      </form>
            </div> }
        </Motion>

        <div className='successmodal'>  
            <div className='innermodal'>
                <i class="fas fa-check-square"/> &nbsp; &nbsp; &nbsp;
                <h2>Let's Get Started</h2> 
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

export default connect(mapStateToProps)(injectStripe(CheckOutForm));