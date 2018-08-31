import React, { Component } from 'react'
import './Landing.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import UserIcon from '../UserIcon/UserIcon'

class Landing extends Component {
  
  login(){
    let {REACT_APP_AUTH0_DOMAIN,
    REACT_APP_AUTH0_CLIENT_ID
  } = process.env;

  let url = `${encodeURIComponent(window.location.origin)}/auth/callback`

  window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_url=${url}&response_type=code`
}

  render(props) {
    let loginUI = this.props.name ? 
    <UserIcon {...props}/>
    : 
    <li className='login' onClick={this.login}>login</li>
    console.log('otter heaven', this.props)
   
    return (
      <div className='landing'>
        
        <div className='headerbar'>
            <div className='logo'><Link to="/"> duly notes </Link></div>
            <nav>
                <Link to="/contact"><li className="landinglinks">mindset</li></Link>
                <Link to="/contact"><li className="landinglinks">contact</li></Link>
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