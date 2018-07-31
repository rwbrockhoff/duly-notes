import React, { Component } from 'react'
import './Landing.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
let defaultPic = "https://www.vccircle.com/wp-content/uploads/2017/03/default-profile.png";

class Landing extends Component {
  
  login(){
    let {REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID
  } = process.env;

  let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

  window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_url=${url}&response_type=code`
}

  render() {
    let loginUI = this.props.sub ? 
    <Link to='/texteditor'><img className='landingprofile' src={this.props.picture} alt='profilepic'/></Link>
    : 
    <li className='login' onClick={this.login}>login</li>


    return (
      <div className='landing'>
        
        <div className='headerbar'>
            <div className='logo'>note</div>
            <nav>
                <li>features</li>
                <li>pricing</li>
                <li>contact</li>
                {loginUI}
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
function mapStateToProps(state){
  return {
    ...this.props, ...state
  }
}
export default connect(mapStateToProps)(Landing)