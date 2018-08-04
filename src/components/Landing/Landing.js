import React, { Component } from 'react'
import './Landing.css';
import {Link, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import LandingFeatures from '../LandingFeatures/LandingFeatures';


class Landing extends Component {
  
  login(){
    let {REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID
  } = process.env;

  let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

  window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_url=${url}&response_type=code`
}

  render() {
    let loginUI = this.props.name ? 
    <Link to='/texteditor'><img className='landingprofile' src={this.props.picture} alt='profilepic'/></Link>
    : 
    <li className='login' onClick={this.login}>login</li>


    return (
      <div className='landing'>
        
        <div className='headerbar'>
            <div className='logo'>note</div>
            <nav>
                <li>mindset</li>
                <Link to="/contact"><li>contact</li></Link>
                {loginUI}
            </nav>
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
export default connect(mapStateToProps)(Landing)