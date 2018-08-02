import React, { Component } from 'react'
import './LandingFeatures.css';

export default class LandingFeatures extends Component {
  register(){
    let {REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID
  } = process.env;

  let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

  window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_url=${url}&response_type=code`
}

    render() {
    return (
      <div className ='LandingFeatures'>

        <div className='intro'>
        <h1> get a better grasp</h1>
        <h5> on how you take notes</h5>
        <button onClick={this.register}>sign up </button>
        </div>

      </div>
    )
  }
}
