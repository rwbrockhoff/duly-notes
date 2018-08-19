import React, { Component } from 'react'
import './SignUp.css';

import {Elements} from 'react-stripe-elements';
import InjectedCheckOutForm from '../CheckOutForm/CheckOutForm';
import {withRouter} from 'react-router-dom';

export default class SignUp extends Component {
  render() {
    return (
      <div className='signup'>
        <Elements>
            <InjectedCheckOutForm {...this.props}/>
        </Elements>
      </div>
    )
  }
}
