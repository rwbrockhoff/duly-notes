import React, { Component } from 'react'
import './LandingFeatures.css';
import typeDown from '../../assets/typeDown.svg';

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

        <div className='features'>
            <h1> Features </h1>

            <div className='grid'>

            <div className='gridItem'>
            <img src={typeDown}/>
            <h2>typeDown</h2>
            <p>Things about typeDown</p>
            </div>

             <div className='gridItem'>
            <img src={typeDown}/>
            <h2>typeDown</h2>
            <p>Things about typeDown</p>
            </div>

             <div className='gridItem'>
            <img src={typeDown}/>
            <h2>typeDown</h2>
            <p>Things about typeDown</p>
            </div>

             <div className='gridItem'>
            <img src={typeDown}/>
            <h2>typeDown</h2>
            <p>Things about typeDown</p>
            </div>


            </div>
        </div>

      </div>
    )
  }
}
