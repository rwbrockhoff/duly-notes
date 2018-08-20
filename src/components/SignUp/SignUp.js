import React, { Component } from 'react'

import {Elements} from 'react-stripe-elements';
import InjectedCheckOutForm from '../CheckOutForm/CheckOutForm';

import {withRouter} from 'react-router-dom';

export default class SignUp extends Component {
  render() {
    const fonts = [{ cssSrc: "https://fonts.googleapis.com/css?family=Nunito+Sans" }]

    return (
      <div className='signup'>
        <Elements fonts={fonts}>
            <InjectedCheckOutForm {...this.props}/>
        </Elements>
      </div>
    )
  }
}
