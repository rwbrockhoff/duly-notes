import React, { Component } from 'react'
import './Landing.css';
import {Link} from 'react-router-dom';

export default class Landing extends Component {
  

  login(){
    let {REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID
  } = process.env;

  let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

  window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_url=${url}&response_type=code`
}


  render() {
    return (
      <div className='landing'>
        
        <div className='headerbar'>
            <div className='logo'>note</div>
            <nav>
                <Link to='/texteditor'><li>Text Editor</li></Link>
                <li>features</li>
                <li>pricing</li>
                <li>contact</li>
                <li className='login' onClick={this.login}>login</li>
            </nav>
        </div>

        <div className='intro'>
        <h1> get a better grasp</h1>
        <h5> on how you take notes</h5>
        <button>remember more </button>

        </div>
        

      </div>
    )
  }
}
